const express = require('express')
const Task = require('../model/task')
const auth = require('../Middleware/authentication')
const dotenv = require('dotenv')
dotenv.config();
const router = new express.Router()


router.post('/tasks', auth ,async (req, res) => {
    try
    {
        const task = new Task({
            ...req.body,
            creator : req.user._id
        })
        await task.save()
        res.status(201).send(task )
    }
    catch(e)  
    {
        res.status(400).send(e)
    }
})


router.get('/tasks/get', auth ,async (req, res) => {
    

    const match = {}
    const sort = {}
    if(req.query.completed)
    {
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy)
    {
        const part  = req.query.sortBy.split(':')
        sort[part[0]] = part[1] === 'desc'? -1 : 1
    }

    try
    {
        await req.user.populate({
            path: 'tasks',
            match,
            options : {
                skip: parseInt(req.query.skip),
                limit: parseInt(req.query.limit),
                sort:
                {
                    // completed: 1   ascending
                    completed: 1 //descending order
                }
            }
        }).execPopulate()
        res.send(req.user.tasks)
    }
    catch(e)
    {
        res.status(404).send(e)
    }

})

router.get('/tasks/get/:id', auth ,async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, creator : req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/change/:id', auth ,async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = [ 'description' , 'completed' ]
    const isValid = updates.every((update)=> allowed.includes(update))
    
    if(!isValid)
    {
        return res.status(400).send({error : 'Invalid updates'})
    }

    try
    {
        const task = await Task.findById(req.params.id)

        updates.forEach((update) =>{ task[update] = req.body[update] })
        await task.save()

        if(!task)
        {
            return res.status(404).send('Not found')
        }
        res.send(task)
    }
    catch(e)  
    {
        res.status(400).send(e)
    }
})

router.delete('/tasks/remove/:id', auth ,async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id : req.params.id , creator : req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router
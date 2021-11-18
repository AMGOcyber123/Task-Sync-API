const express = require('express')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const auth = require('../Middleware/authentication')

const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try
    {
        const user = new User(req.body)
        await user.save()
        res.status(201).send(user)
    }
    catch(e)  
    {
        res.status(400).send(e)
    }
})

// -----------------------------------login auth ------------------------------------------//


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({ user: user.getPublicProfile(), token })
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(`Can't Login !`)
    }
})


// --------------------------------------logout --------------------------------------------//

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send('Logged Out !')
    } catch (e) {
        res.status(500).send()
    }
})


// ----------------------------------- Logout all -----------------------------------------//

router.post('/users/logoutAll' , auth ,async(req,res) =>{
    
    try
    {
        req.user.tokens = []
        await req.user.save()
        res.send('Logged out')
    }
    catch(e)    
    {
        res.status(500).send(e)
        console.log(e)
    }
})

// ----------------------------------- Get User Profile -----------------------------------------//

router.get('/users/get/me', auth,async (req, res) => {
    res.send(req.user)
})



router.get('/users/get/:id', auth ,async (req, res) => {
    const id = req.params.id
    try
    {
        const user = await User.find({_id : id})
        if (!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }
    catch(e)
    {
        res.send().status(500)
    }
})

// ----------------------------------- Edit User Profile -----------------------------------------//

router.patch('/users/change/me', auth ,async (req, res) => {
    const updates = Object.keys(req.body)
    // console.log(updates)
    const allowed = ['name','email','age','password',]
    const isValid = updates.every((update)=>allowed.includes(update))

    if(!isValid)
    {
        return res.status(400).send({error : 'Invalid updates'})
    }


    try
    {
        updates.forEach((update) =>{ req.user[update] = req.body[update] })
        await req.user.save()
        res.send(req.user)
    }
    catch(e)  
    {
        res.status(400).send(e)
    }
})

// ----------------------------------- Delete User profile -----------------------------------------//

router.delete('/users/remove/me', auth ,async (req, res) => {
    try
    {
        await req.user.remove()
        res.send(req.user)
    }
    catch(e)
    {
        console.log(e)
        return res.status(500).send('Server Error')
    }

})

module.exports = router
const express = require('express')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const auth = require('../Middleware/authentication')
const multer = require('multer')
const sharp = require('sharp')
const { sendEmail,cancelEmail } = require('../email/account')
const dotenv = require('dotenv')
dotenv.config();

const router = new express.Router()

// -----------------------------------Create user ------------------------------------------//

router.post('/user', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        sendEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }
    catch (e) {
        res.status(400).send(e)
    }
})

// -----------------------------------login auth ------------------------------------------//


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(`Can't Login !`)
    }
})


// ---------------------------- Profile Picture -------------------------------------------//

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, check) {
        let test = file.originalname.match('/.pdf|.jpeg|.jpg|.png|.jpg/')
        if (!test) {
            return check(new Error('Please upload in PDF/ JPEG/ JPG/ PNG format !'))
        }
        check(undefined, true)
    }
})


router.post('/user/me/upload',auth ,upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message }) // sends the actual error 
})


router.get('/user/:id/avatar' , async(req,res) =>{
    try
    {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar)
        {
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    }
    catch(e)
    {
        res.status(404).send(e)
    }
})

router.delete('/user/me/upload', auth, async(req,res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
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

router.delete('/user/remove/me', auth, async (req, res) => {
    const user = req.user
    try {
        await user.remove()
        cancelEmail(user.email,user.name)
        res.send(req.user)
    }
    catch (e) {
        console.log(e)
        return res.status(500).send('Server Error')
    }

})


module.exports = router
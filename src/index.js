const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const taskRoute = require('./routes/taskRoute')
const userRoute = require('./routes/userRoute')
const Task = require('./model/task')
const User = require('./model/user')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next) =>{                          //can help in validating 
//     // console.log(req.method, req.path)
//     if(req.method === 'GET')
//     {
//         res.send('GET REQUEST disabled')
//     }
//     else
//     {
//         next()
//     }
// })

// app.use((req,res,next) =>{                              // When site is put on hold for maintenance 
//     res.status(503).send('Site under maintaince ! ')
// })



app.use(express.json())

app.use(userRoute)
app.use(taskRoute)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

const pet = {
    name : 'hal'
}

// pet.toJson = function()
// {
//     console.log(this)
//     return this
// }
// console.log(JSON.stringify(pet))


// const task = async() =>{
//     // const task = await Task.findById('61863b11558b4a362874575a')
//     // await task.populate('creator').execPopulate()
//     // console.log(task.creator)
//     const user = await User.findById('618646cbcc068a45ac44d685')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// task()



/*
 "email" : "ajay23@gmail.com",
 "password" : "1werty123456",
 "email" : "boati23@gmail.com",
 "password" : "werty123456",
 "email" : "kacci@gmail.com",
 "password" : "123456789aa",
 "email" : "carlp@yahoo.com",
 "password" : "123456789aa",
 "email" : "kumar1992@yahoo.com",
 "password" : "1234789aa",
*/
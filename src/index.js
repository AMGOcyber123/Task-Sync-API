const express = require('express')
const taskRoute = require('./routes/taskRoute')
const userRoute = require('./routes/userRoute')
require('./db/mongoose')
const app = express()
const dotenv = require('dotenv')
dotenv.config();

const port = process.env.PORT || 8080

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
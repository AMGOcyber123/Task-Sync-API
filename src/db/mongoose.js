const mongoose = require('mongoose')
const link = 'mongodb://127.0.0.1:27017/task-manager-api' || process.env.DB_URI
mongoose.connect(link, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify : false
})
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const link = process.env.DB_URI
mongoose.connect(link, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify : false
})
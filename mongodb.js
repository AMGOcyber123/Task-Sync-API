// CRUD create read update delete
//to get the timestamp getTimeStamp()

const mongodb = require('mongodb')
const connectionURL = 'mongodb://127.0.0.1:27017'
const  {MongoClient , ObjectId} = require('mongodb')
const databaseName = 'task-manager'
const Id = new ObjectId()
console.log(Id) 
// console.log(Id.id.length) 
// console.log(Id.toHexString().length)


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    const updatePromise = db.collection('users').deleteMany({
        name : 'Jack'
    })
    updatePromise.then((result) =>{
        console.log(result)
    }).catch((error) =>{
        console.log(error)
    })
})

const deleteTaskcount  = async (id) =>{
    const task = await task.findByIdandDelete(id)
    const count = await task.countDocuments({completed : false})
    return count
}
 

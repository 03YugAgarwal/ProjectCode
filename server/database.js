require('dotenv').config()
let mongoose = require('mongoose')

async function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected");
    }catch(error){
        console.error(error)
    }
}

module.exports = connectDB
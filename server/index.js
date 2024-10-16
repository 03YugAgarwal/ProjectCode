require('dotenv').config()
const connectDB = require("./database")
const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send('Hello World')
})

const AssignmentRoute = require('./routes/AssignmentRoute')
app.use('/student',AssignmentRoute);

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
    connectDB();
})
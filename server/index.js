require('dotenv').config()
const connectDB = require("./database")
const express = require('express')
const app = express()

const verifyToken = require('./middleware/authMiddleware')

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World')
})

const AssignmentRoute = require('./routes/AssignmentRoute')
app.use('/student',verifyToken, AssignmentRoute);
const UserRoute = require('./routes/UserRoute')
app.use('/user',UserRoute)
const CourseRoute = require('./routes/CourseRoute')
app.use('/course', verifyToken,CourseRoute)
const TeacherRoute = require('./routes/TeacherRoute')
app.use('/teacher',TeacherRoute)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
    connectDB();
})
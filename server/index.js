require('dotenv').config()
const connectDB = require("./database")
const express = require('express')
const app = express()
const cors = require('cors');

const verifyToken = require('./middleware/authMiddleware')

// middleware
app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello World')
})

const ValidateRoute = require('./routes/ValidateRoute')
app.use('/validate',ValidateRoute)
const TeacherRoute = require('./routes/TeacherRoute')
app.use('/teacher',TeacherRoute)
const UserRoute = require('./routes/UserRoute')
app.use('/user',UserRoute)

app.use(verifyToken)

const CourseRoute = require('./routes/CourseRoute')
app.use('/course', CourseRoute)
const AssignmentRoute = require('./routes/AssignmentRoute')
app.use('/student', AssignmentRoute);
const AnswerRoute = require('./routes/AnswerRoute')
app.use('/answer',AnswerRoute)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
    connectDB();
})
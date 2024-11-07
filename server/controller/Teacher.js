require("dotenv").config();
const { User } = require("../models/UserSchema");
const Teacher  = require("../models/TeacherSchema");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const getAllTeachers = async (req, res) => {
  try {
    const teacher = await Teacher.find();
    if (!teacher) {
      res.status(200).json({});
      return;
    }

    TeacherIDs = teacher.map((teacher)=> teacher.TeacherID)

    res.status(200).json({TotalTeachers: teacher.length, TeacherIDs });
  } catch (error) {
    res
      .status(500)
      .json({ error: "CouldntFetchTeachers", message: "Server Error" });
  }
};

const createTeacher = async (req, res) => {
  try {
    const { TeacherID, Name, Email, Password } = req.body;

    const role = req.role

    if(!role.includes(2)){
      return res.status(401).json({"message": "Not authorized to create"})
    }

    if (!TeacherID || !Name || !Email || !Password) {
      res.status(400).json({
        error: "MissingFields",
        message: "All fields are required to create a teacher",
      });
      return;
    }

    const existsingTeacher = await Teacher.findOne({TeacherID})
    if(existsingTeacher){
      return res.status(401).json({"message": "Teacher already exists"})
    }

    const hashPassword = await bcrypt.hash(Password, saltRounds);
    let teacherRegisterNumber = 'T-'+TeacherID
    const newUser = await User.create({ RegisterNumber: teacherRegisterNumber,Name, Email, Password: hashPassword });
    const newTeacher = await Teacher.create({ TeacherID, User: newUser._id });

    res.status(200).json(newTeacher);
  } catch (error) {
    res.status(500).json({
      error: "CouldntCreateTeachers",
      message: "Error in creating an account for Teacher",
      errorCatch: error.message,
    });
  }
};

const loginTeacher = async (req, res) => {
  try {
    const { TeacherID, Password } = req.body;
    if (!TeacherID || !Password) {
      res.status(400).json({
        error: "MissingFields",
        message: "All fields are required to create a teacher",
      });
      return;
    }

    const existsTeacher = await Teacher.findOne({ TeacherID });
    if (!existsTeacher) {
      res.status(404).json({
        error: "NothingFound",
        message: "No Teacher with matching credentials found",
      });
      return;
    }
    const existsUser = await User.findOne({ _id: existsTeacher.User });
    if (!existsUser) {
      res.status(404).json({
        error: "NothingFound",
        message: "No Teacher with matching credentials found",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(Password, existsUser.Password);
    if (!passwordMatch) {
      res.status(401).json({
        error: "AuthFailed",
        message: "Authentication failed, check credentials",
      });
      return
    }

    const token = jwt.sign({ userId: existsTeacher._id }, JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
  
      res.status(200).json({ role: [0,1] ,token });

  } catch (error) {
    res.status(500).json({
      error: "CouldntLogin",
      message: "Error in logging in, Try again later",
      errorCatch: error.message,
    });
  }
};

module.exports = { getAllTeachers, createTeacher, loginTeacher };

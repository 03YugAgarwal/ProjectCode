require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const {User} = require('../models/UserSchema')

// const salt = process.env.SALT
const saltRounds = 10;

const getUser = async (req,res) => {
    try{
        const Users = await User.find()
        res.json(Users).status(200)
    }catch(error){
        res.status(500).json({error: "NoUser",message: "No Users found"})
    }
}

const createUser = async (req, res) => {
    try {
      const { RegisterNumber, Name, Email, Password } = req.body;

      if (!RegisterNumber || !Name || !Email || !Password) {
        return res.status(400).json({ error: "MissingFields", message: "All fields are required" });
      }

      const userByEmail = await User.findOne({ Email });
      const userByRegisterNumber = await User.findOne({ RegisterNumber });
  
      if (userByEmail || userByRegisterNumber) {
        return res.status(409).json({ error: "UserAlreadyExists", message: "User with this email or register number already exists" });
      }

      const hashPassword = await bcrypt.hash(Password, saltRounds);

      const newUser = new User({
        RegisterNumber,
        Name,
        Email,
        Password: hashPassword
      });
  
      const savedUser = await newUser.save();
      res.status(201).json({ userId: savedUser._id });
      
    } catch (error) {
      console.error("Error in createUser:", error); 
      res.status(500).json({
        error: "CouldNotCreateUser",
        message: "Internal Server Error",
        errorCatch: error.message || error
      });
    }
  };

  

module.exports = {getUser, createUser}
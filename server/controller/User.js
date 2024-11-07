require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/UserSchema");
const Teacher = require("../models/TeacherSchema");

const Admin = require("../models/AdminSchema");

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const getUser = async (req, res) => {
  try {
    const Users = await User.find();

    const UserIDs = Users.map((User) => User.RegisterNumber);

    res.status(200).json({ UserCount: Users.length, UserIDs });
  } catch (error) {
    res.status(500).json({ error: "NoUser", message: "No Users found" });
  }
};

const createUser = async (req, res) => {
  try {
    const { RegisterNumber, Name, Email, Password } = req.body;

    if (!RegisterNumber) {
      return res
        .status(400)
        .json({ error: "MissingFields", message: "All fields are required" });
    }

    const userByEmail = await User.findOne({ Email });
    const userByRegisterNumber = await User.findOne({ RegisterNumber });

    if (userByEmail || userByRegisterNumber) {
      return res.status(409).json({
        error: "UserAlreadyExists",
        message: "User with this email or register number already exists",
      });
    }

    const hashPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = new User({
      RegisterNumber,
      Name,
      Email,
      Password: hashPassword,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ userId: savedUser._id });
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({
      error: "CouldNotCreateUser",
      message: "Internal Server Error",
      errorCatch: error.message || error,
    });
  }
};

const createUsers = async (req, res) => {
  try {
    const { RegisterNumbers } = req.body; 

    const role = req.role
    if(!role.includes(2)){
      return res.status(401).json({"message": "Not Authorized"})
    }

    console.log(RegisterNumbers);
    

    if (!Array.isArray(RegisterNumbers) || RegisterNumbers.length === 0) {
      return res
        .status(400)
        .json({ error: "MissingFields", message: "RegisterNumbers array is required" });
    }

    const saltRounds = 10;
    const createdUsers = [];

    for (const RegisterNumber of RegisterNumbers) {
      const userExists = await User.findOne({ RegisterNumber });
      if (!userExists) {
        const hashPassword = await bcrypt.hash(RegisterNumber, saltRounds);

        const newUser = new User({
          RegisterNumber,
          Name: `User_${RegisterNumber}`,
          Email: `${RegisterNumber}@gmail.com`,
          Password: hashPassword,
        });

        const savedUser = await newUser.save();
        createdUsers.push({ userId: savedUser._id, RegisterNumber });
      }
    }

    if (createdUsers.length > 0) {
      res.status(201).json({ createdUsers });
    } else {
      res.status(200).json({
        message: "No new users were created, all RegisterNumbers already exist.",
      });
    }
  } catch (error) {
    console.error("Error in createUsers:", error);
    res.status(500).json({
      error: "CouldNotCreateUsers",
      message: "Internal Server Error",
      errorCatch: error.message || error,
    });
  }
};


const getOneUser = async (req, res) => {
  try {
    const { RegisterNumber, Email } = req.body;
    let foundUser;
    if (RegisterNumber) {
      foundUser = await User.findOne({ RegisterNumber });
    } else if (Email) {
      foundUser = await User.findOne({ Email });
    } else {
      return res
        .status(400)
        .json({ error: "MissingFields", message: "All fields are required" });
    }

    res.status(200).json(foundUser);
  } catch (error) {
    console.error("Error in getting one user:", error);
    res.status(500).json({
      error: "NoUserFound",
      message: "Internal Server Error",
      errorCatch: error.message || error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { RegisterNumber, Password } = req.body;
    if (!RegisterNumber || !Password) {
      res
        .status(400)
        .json({ error: "MissingFields", message: "All fields are required" });
      return;
    }

    const admin = await Admin.findOne({adminid: RegisterNumber})
    
    if (admin) {
      const passwordMatch = await bcrypt.compare(Password, admin.password);
      if (!passwordMatch) {
        res.status(401).json({
          error: "AuthFailed",
          message: "Authentication failed, check credentials",
        });
        return;
      }
      const token = jwt.sign({ userId: admin._id }, JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
      return res.status(200).json({ role: [0, 1, 2], token });
    }


    const teacher = await Teacher.findOne({ TeacherID: RegisterNumber });

    const exists = await User.findOne({ RegisterNumber });

    if (teacher) {
      const user = await User.findById(teacher.User);
      const passwordMatch = await bcrypt.compare(Password, user.Password);
      if (!passwordMatch) {
        res.status(401).json({
          error: "AuthFailed",
          message: "Authentication failed, check credentials",
        });
        return;
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
      return res.status(200).json({ role: [0, 1], token });
    }

    if (!exists) {
      res.status(401).json({
        error: "NoUserFound",
        message: "No User with given credentials found.",
      });
      return;
    }

    const passwordMatch = await bcrypt.compare(Password, exists.Password);
    if (!passwordMatch) {
      res.status(401).json({
        error: "AuthFailed",
        message: "Authentication failed, check credentials",
      });
      return;
    }
    const token = jwt.sign({ userId: exists._id }, JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE,
    });

    res.status(200).json({ role: [0], token });
  } catch (error) {
    console.error("Error in Login User:", error);
    res.status(500).json({
      error: "CouldNotLogin",
      message: "Internal Server Error",
      errorCatch: error.message || error,
    });
  }
};

const createAdmin = async (req, res) => {
  try {
    const { adminid, password } = req.body;
    if (!adminid || !password) {
      return res
        .status(400)
        .json({ error: "MissingFields", message: "All fields are required" });
    }

    const adminById = await Admin.findOne({ adminid })
    
    if(adminById){
      return res.status(409).json({
        error: "AdminAlreadyExists",
        message: "Admin with this admin number already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new Admin({
      adminid, password: hashPassword
    });

    const savedUser = await newUser.save();
    res.status(201).json({ userId: savedUser._id });

  } catch (error) {
    res.status(500).json({
      error: "CouldntCreateAdminUser",
      message: "Internal Server Error",
      errorCatch: error.message || error,
    });
  }
};

module.exports = { getUser, getOneUser, createUser, createUsers, loginUser, createAdmin };

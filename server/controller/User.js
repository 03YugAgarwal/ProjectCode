require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/UserSchema");

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const getUser = async (req, res) => {
  try {
    const Users = await User.find();

    const UserIDs = Users.map((User) => User.RegisterNumber)

    res.status(200).json({UserCount: Users.length,UserIDs});
  } catch (error) {
    res.status(500).json({ error: "NoUser", message: "No Users found" });
  }
};

const createUser = async (req, res) => {
  try {
    const { RegisterNumber, Name, Email, Password } = req.body;

    if (!RegisterNumber || !Name || !Email || !Password) {
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

    const exists = await User.findOne({ RegisterNumber });
    if (!exists) {
      res
        .status(401)
        .json({
          error: "NoUserFound",
          message: "No User with given credentials found.",
        });
      return;
    }

    const passwordMatch = await bcrypt.compare(Password, exists.Password);
    if (!passwordMatch) {
      res
        .status(401)
        .json({
          error: "AuthFailed",
          message: "Authentication failed, check credentials",
        });
        return
    }
    const token = jwt.sign({userId: exists._id }, JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRE,
    });

    res.status(200).json({ role: 0, token });

  } catch (error) {
    console.error("Error in Login User:", error);
    res.status(500).json({
      error: "CouldNotLogin",
      message: "Internal Server Error",
      errorCatch: error.message || error,
    });
  }
};

module.exports = { getUser, getOneUser, createUser, loginUser };

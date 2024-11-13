require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/UserSchema");
const Teacher = require("../models/TeacherSchema");

const Admin = require("../models/AdminSchema");

const JWT_SECRET = process.env.JWT_SECRET;
const saltRounds = 10;

const resetPasswordUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { oldPassword, newPassword } = req.body;

    const passMatch = await bcrypt.compare(oldPassword, user.Password);
    if (!passMatch) {
      return res.status(401).json({
        error: "Wrong Password",
        message: "Wrong Old Password provided",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    const nUser = await User.findByIdAndUpdate(user._id, {
      Password: hashPassword,
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Couldn't Reset Password",
      errorCatch: error.message,
    });
  }
};

const resetPasswordTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.userId);
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(teacher.User);
    const passMatch = await bcrypt.compare(oldPassword, user.Password);
    if (!passMatch) {
      return res.status(401).json({
        error: "Wrong Password",
        message: "Wrong Old Password provided",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    const nUser = await User.findByIdAndUpdate(user._id, {
      Password: hashPassword,
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Couldn't Reset Password",
      errorCatch: error.message,
    });
  }
};

const resetPasswordAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.userId);
    const { oldPassword, newPassword } = req.body;

    const passMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!passMatch) {
      return res.status(401).json({
        error: "Wrong Password",
        message: "Wrong Old Password provided",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, saltRounds);
    const nUser = await Admin.findByIdAndUpdate(admin._id, {
      password: hashPassword,
    });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Couldn't Reset Password",
      errorCatch: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const role = req.role;
    if (!role.includes(2)) {
      return res.status(401).json({
        error: "NotAuthorized",
        message: "Only admins are allowed to perform this action",
      });
    }
    const { type, userid } = req.body;

    if (type === "student") {
      const user = await User.findOne({ RegisterNumber: userid });

      const hashPassword = await bcrypt.hash(userid, saltRounds);
      const nUser = await User.findByIdAndUpdate(user._id, {
        Password: hashPassword,
      });

      return res.status(200).json({ message: "Password updated successfully" });
    } else if (type === "teacher") {
      const teacher = await Teacher.findOne({ TeacherID: userid });
      const user = await User.findById(teacher.User);
      const hashPassword = await bcrypt.hash(userid, saltRounds);
      const nUser = await User.findByIdAndUpdate(user._id, {
        Password: hashPassword,
      });
      return res.status(200).json({ message: "Password updated successfully" });
    } else if (type === "admin") {
      const admin = await Admin.findById(req.userId);
      const hashPassword = await bcrypt.hash(userid, saltRounds);
      const nUser = await Admin.findByIdAndUpdate(admin._id, {
        password: hashPassword,
      });
      return res.status(200).json({ message: "Password updated successfully" });
    }

    return res.status(404).json({error: "NoSuchType",message: "No user with given type found"})

  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: "Couldn't Reset Password",
      errorCatch: error.message,
    });
  }
};

module.exports = {
  resetPasswordUser,
  resetPasswordTeacher,
  resetPasswordAdmin,
  resetPassword,
};

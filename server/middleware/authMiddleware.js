const User = require("../models/UserSchema");
const Teacher = require("../models/TeacherSchema");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminSchema");

const JWT_SECRET = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const teacher = await Teacher.findById(decoded.userId);
    const admin = await Admin.findById(decoded.userId)

    if(admin){
      req.role = [0, 1, 2];
    }
    else if (teacher) {
      req.role = [0, 1];
    } else {
      req.role = [0];
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token", errorCatch: error.message });
  }
}

module.exports = verifyToken;

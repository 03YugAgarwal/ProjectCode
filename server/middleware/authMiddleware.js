const User = require("../models/UserSchema");
const Teacher = require("../models/TeacherSchema");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

async function verifyToken(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const teacher = await Teacher.findById(decoded.userId);

    if (teacher) {
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

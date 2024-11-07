const jwt = require("jsonwebtoken");
const Teacher = require("../models/TeacherSchema");
const Admin = require("../models/AdminSchema")

const JWT_SECRET = process.env.JWT_SECRET

async function ValidateToken(req, res) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const admin = await Admin.findOne({adminid: decoded.userId})

    if(admin){
      return res.status(200).json({role: [0,1,2]})
    }

    const teacher = await Teacher.findById(decoded.userId)
    if(teacher){
      return res.status(200).json({role: [0,1]})
    }

    res.status(200).json({role: [0]})
  } catch (error) {
    res.sendStatus(403);
  }
}
async function ValidateTokenFaculty(req, res) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const teacher = await Teacher.findById(decoded.userId)
    
    if(!teacher){
      return res.status(401).json({ error: "Access denied" })
    }

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(403);
  }
}

module.exports = {ValidateToken, ValidateTokenFaculty};

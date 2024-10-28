const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET

function ValidateToken(req, res) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(403);
  }
}

module.exports = {ValidateToken};

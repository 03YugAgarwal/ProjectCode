const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const {
  getUser,
  getOneUser,
  createUser,
  loginUser,
  createAdmin,
  createUsers
} = require("../controller/User");

router.get("/", verifyToken, getUser);
router.post("/one", verifyToken, getOneUser); // change logic to get
router.post("/create", verifyToken, createUser);
router.post("/createMultiple", verifyToken, createUsers);
router.post("/login", loginUser);
router.post("/admincreate", createAdmin);

module.exports = router;

const express = require("express");
const router = express.Router();

const {getUser, getOneUser ,createUser,loginUser} = require('../controller/User')

router.get('/',getUser)
router.post('/one',getOneUser) // change logic to get
router.post('/create',createUser)
router.post('/login',loginUser)

module.exports = router
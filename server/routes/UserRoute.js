const express = require("express");
const router = express.Router();

const {getUser,createUser} = require('../controller/User')

router.get('/',getUser)
router.post('/create',createUser)

module.exports = router
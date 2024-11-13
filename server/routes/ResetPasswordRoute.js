const express = require("express");
const router = express.Router();

const {resetPasswordUser, resetPasswordTeacher, resetPasswordAdmin, resetPassword} = require("../controller/ResetPassword")

router.put('/user',resetPasswordUser)
router.put('/teacher',resetPasswordTeacher)
router.put('/admin',resetPasswordAdmin)

router.put('/byadmin',resetPassword)


module.exports = router;

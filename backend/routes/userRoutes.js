const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const userRouter = express.Router();
const verifyOtp = require('../controllers/authController')
const User = require('../models/User')
const {sendOtp} = require('../controllers/authController')

userRouter.get("/me",verifyToken.verifyToken,async (req,res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).json({success: true,user})

  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
})

userRouter.post("/verify",verifyOtp.verifyOtp);
userRouter.post("/send-otp",sendOtp)

module.exports = userRouter
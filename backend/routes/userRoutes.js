const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const userRouter = express.Router();
const User = require('../models/User')

userRouter.get("/me",verifyToken.verifyToken,async (req,res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).json({success: true,user})

  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
})
module.exports = userRouter
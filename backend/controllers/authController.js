const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const redisClient = require('../redisClient')

//Signup
exports.registerUser = async (req,res) => {
  try {
    const {name, email, password} = req.body;
 
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({name, email, password: hashedPassword});

    await newUser.save();
  
  
    //token generate
    const token = jwt.sign(
      {userId: newUser._id, name: newUser.name},
      process.env.JWT_KEY,
      {expiresIn: 30}
    );

    res.cookie("token",token,{
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({message: "Registration Successfully.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}


//send Otp
exports.sendOtp = async (req,res) => {
  try {
    const {email} = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    redisClient.setex(email,otpExpiry/1000,otp);

    await sendEmail(email,"Verify Your Email", `<h2>Your OTP is ${otp}</h2>`);
    res.status(200).json({otp,otpExpiry,message: "OTP sent to your email"})
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP" });
  }

}

//Login
exports.loginUser = async (req,res) => {
  try {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({error: "User not found"})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({error: "Invalid credentials"})
    }

    //JWT token generate
    const token = jwt.sign(
      {userId: user._id, email: user.email},
      process.env.JWT_KEY,
      {expiresIn: 30}
    );

    res.
    cookie("token",token,{
      httpOnly:true,
      secure: process.env.NODE_ENV === "production",
      sameSite : "strict",
      maxAge: 24*60*60*1000
    }).
    status(200).json({message: "Login successful",token})
    
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}

exports.logoutUser =  (req,res) => {
  res.clearCookie("token",{httpOnly:true});
  res.status(200).send("Logged out successfylly")
}

//verify otp
exports.verifyOtp = async (req,res) => {
  try {
    const {email,otp} = req.body

    const user = await User.findOne({email});

    if (!user) {
      return res.status(404).json({error:"User not found"});
    }

    if (user.isVerified) {
      return res.status(400).json({error: "User already verified"})
    }

    //redis
    redisClient.get(email,(err,storedOtp)=>{
      if(err){
        return res.status(500).json({error: "Error fetching OTP from Redis"})
      }

      if(storedOtp){
        return res.status(400).json({error: "OTP has expired or not found" })
      }

      if(storedOtp !== otp){
        return res.status(400).json({error: "Invalid OTP"})
      }

      user.isVerified = true;

      user.otp = null;
      user.otpExpiry = null;

      user.save()
      .then(()=>{
        redisClient.del(email,(err)=>{
          if(err){
            console.error("Error deleting OTP from Redis:", err)
          }
        })
        return res.status(200).json({message: "Email verified successfully" })
      })
      .catch((error) => {
        return res.status(500).json({ error: "Failed to save user data" });
      })
    })

  } catch (error) {
    res.status(500).json({ error: "OTP verification failed" });
  }
};
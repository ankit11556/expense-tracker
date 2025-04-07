const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Signup
exports.registerUser = async (req,res) => {
  try {
    const {name, email, password} = req.body;

    const existUser = await User.findOne({email})
    if(existUser){
    return res.status(400).json({error: "Email already registered"})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({name, email, password: hashedPassword});

    await newUser.save();

    res.status(201).json({message: "User registered successfully"})
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
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
      {expiresIn: "1d"}
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
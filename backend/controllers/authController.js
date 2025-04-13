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
  
    //token generate
    const token = jwt.sign(
      {userId: newUser._id, name: newUser.name},
      process.env.JWT_KEY,
      {expiresIn: '7d'}
    );

    res.cookie("token",token,{
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    res.status(201).json({message: "User registered successfully",
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
      {expiresIn: "30s"}
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
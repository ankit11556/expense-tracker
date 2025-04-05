const User = require("../models/User");
const bcrypt = require('bcrypt')
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
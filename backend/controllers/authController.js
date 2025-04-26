const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const redisClient = require('../config/redisClient')
const {OAuth2Client} = require('google-auth-library');

//google login 

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.googleLogin = async (req,res) => {
    const {tokenId} = req.body;
    
    try {
      const   ticket = await client.verifyIdToken({
        idToken: tokenId,
        audience : process.env.GOOGLE_CLIENT_ID,
      });

      const {email_verified,name,email,sub: googleId} = ticket.getPayload();

      if (!email_verified) {
       return res.status(400).json({ error: 'Email not verified by Google' });
      }

      let user = await User.findOne({email, authType: 'google'});

      if (!user) {
        user = await User.create({
          name,
          email,
          googleId,
          authType: 'google',
          password: 'not-required'
        })
      }

      const token = jwt.sign(
        {userId: user._id},
        process.env.JWT_KEY,
        {expiresIn: "1d"}
      );

      res.cookie("token",token,{
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      

      res.status(200).json({token,
        message: 'Google login successful',
        user: {
        id: user._id,
        name: user.name,
        email: user.email,
        authType: user.authType
      }})

    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}

//Signup
exports.registerUser = async (req,res) => {
  try {
    const {name, email, password} = req.body;

    const isVerified = await redisClient.get(`verified:${email}`);
    if (!isVerified) {
      return res.status(400).json({ error: "Please verify your email first" });
    }
    
 
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({name, email, password: hashedPassword});

    await newUser.save();
  
   await redisClient.del(`verified:${email}`)
  
    //token generate
    const token = jwt.sign(
      {userId: newUser._id, name: newUser.name},
      process.env.JWT_KEY,
      {expiresIn: "1d"}
    );
   
    res.cookie("token",token,{
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
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

    const otpRecentlySent = await redisClient.get(`otpSent:${email}`);
    if (otpRecentlySent) {
       return res.status(429).json({ error: "OTP already sent. Please wait before resending." });
    
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    redisClient.setEx(email,120,otp);

    await redisClient.setEx(`otpSent:${email}`,120,'true')

    await sendEmail(email,"Verify Your Email", `<h2>Your OTP is ${otp}</h2>`);

    res.status(200).json({otp,message: "OTP sent to your email. Please check inbox or spam folder."})
  } catch (error) {
    console.error(error);
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
      {expiresIn: "1d"}
    );

    res.
    cookie("token",token,{
      httpOnly:true,
      sameSite: "Lax",
      secure: false,
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

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }
    
    //redis
    const storedOtp = await redisClient.get(email); // Promise-style get
   
      if(!storedOtp){
        return res.status(400).json({error: "OTP has expired or not found" })
      }

      if(storedOtp !== otp.toString().trim()){
        return res.status(400).json({error: "Invalid OTP"})
      }

      await redisClient.setEx(`verified:${email}`,120,'true');
      await  redisClient.del(email);

      res.status(200).json({ message: "OTP verified successfully" });
    
  } catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).json({ error: "OTP verification failed" });
  }
};

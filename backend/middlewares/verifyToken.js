const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res,next)=>{
  const token  = req.cookies.token;

  if (!token) {
    return res.status(401).json({error: "Unauthorized. Token not found."})
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    req.user = decoded;
    next()
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
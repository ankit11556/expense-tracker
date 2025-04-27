const express = require('express');
const morgan = require('morgan')
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}

require('dotenv').config()

require('./config/db')
require('./config/redisClient')

const cors = require('cors')
const cookieParser = require("cookie-parser");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per IP in 15 minutes
});


app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))


app.use(express.json())
app.use(helmet());
app.use(limiter);
app.use(compression());

const transactionRouter = require('./routes/transactionRoutes')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

app.use("/api/user",userRouter)
app.use('/api/auth',authRouter)
app.use('/api/transactions',transactionRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,  // if production, generic message
    stack: process.env.NODE_ENV === 'production' ? null : err.stack  // if production, no stack trace
  });
});


const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running att http://localhost:${PORT}`);
})

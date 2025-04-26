const express = require('express');
const app = express();

require('dotenv').config()

require('./config/db')
require('./config/redisClient')

const cors = require('cors')
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json())

const transactionRouter = require('./routes/transactionRoutes')
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

app.use("/api/user",userRouter)
app.use('/api/auth',authRouter)
app.use('/api/transactions',transactionRouter);

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running att http://localhost:${PORT}`);
})

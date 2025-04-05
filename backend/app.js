const express = require('express');
const app = express();
const cors = require('cors')
const transactionRouter = require('./routes/transactionRoutes')
const authRouter = require('./routes/authRoutes')

require('dotenv').config()
require('./config/db')

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRouter)
app.use('/api/transactions',transactionRouter);

app.get("/",(req,res)=>{
  res.send('hello word')
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running att http://localhost:${PORT}`);
})

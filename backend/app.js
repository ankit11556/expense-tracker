const express = require('express');
const app = express();
const transactionRouter = require('./routes/transactionRoutes')

require('dotenv').config()
require('./config/db')

app.use(express.json())
app.use('/api/transactions',transactionRouter);

app.get("/",(req,res)=>{
  res.send('hello word')
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running att http://localhost:${PORT}`);
})

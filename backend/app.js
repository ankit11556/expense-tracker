const express = require('express');
const app = express();
require('dotenv').config()

app.get("/",(req,res)=>{
  res.send('hello word')
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running att http://localhost:${PORT}`);
})

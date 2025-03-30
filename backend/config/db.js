const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log('MongoDb connected');
}).catch((error)=>{
  console.log("MongoDb not connectd",error);
})

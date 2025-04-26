const redis = require('redis')
require('dotenv').config();

const redisClient = redis.createClient({
  url : process.env.REDIS_URL
})

redisClient.connect()
  .then(() => {
    console.log("Connected to Redis Cloud");
  })
  .catch((err) => {
    console.log("Detailed Redis connection error: ", err);
  });

redisClient.on('connect',()=>{
  console.log("Successfully connected to Redis Cloud")
})

redisClient.on('error',(err)=>{
  console.log("Redis error: " + err);
})

module.exports = redisClient
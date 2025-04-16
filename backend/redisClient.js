const redis = require('redis')

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
})

redisClient.on('connect',()=>{
  console.log("Connect to redis")
})

redisClient.on('error',(err)=>{
  console.log("Redis error: " + err);
})

module.exports = redisClient
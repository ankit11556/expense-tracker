const redis = require('redis')

const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379,
})

redisClient.connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.log("Redis connection error: ", err);
  });

redisClient.on('connect',()=>{
  console.log("Connect to redis")
})

redisClient.on('error',(err)=>{
  console.log("Redis error: " + err);
})

module.exports = redisClient
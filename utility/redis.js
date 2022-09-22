const redis = require('redis');

const client = redis.createClient(6379);

client.on("connect" ,()=>{
  console.log("Redis Connected")
})
client.on("error", (error) => {
  console.error(error);
});


module.exports = client;
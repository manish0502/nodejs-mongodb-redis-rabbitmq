const amqp = require("amqplib");
const config = require("../config/rabbitMqConsumer");

/**
   1. create connection with rabbitMQ
   2. create the new channel
   3. create the exchange
   4. create the queue
   5. bind the queue to the exchange
   6. consume message from the queue
 */

async function consumeMessages() {

 // 1. create connection 
 // 2. createchannel
  const connection = await amqp.connect(config.rabbitMQ.url);
  this.channel = await connection.createChannel();

  // 3.create the exchange
  const exchangeName = config.rabbitMQ.exchangeName;
  await this.channel.assertExchange(exchangeName, "direct");

  // 4. create a queue
  const q = await this.channel.assertQueue(config.rabbitMQ.queueName);

  // 5. bind the queue to exchange
  const routingKey = "Info";
  await this.channel.bindQueue(q.queue, exchangeName, "Info");

  // 6. consume the message from the queue

  this.channel.consume(q.queue, (msg) => {
    const data = JSON.parse(msg.content);
    console.log(data);
    this.channel.ack(msg);
  });
}

consumeMessages();

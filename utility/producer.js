const amqp = require("amqplib");
const config = require("../config/rabbitMq");
const Customer = require('../models/Customer.model')
/** 
 step-1 : connect with rabbitmq server
 step-2 : create a new channel on it
 step-3 : create exchange
 step-4 : Publish the message to exchange with routing key
*/

 class Producer {
   channel ;

  async createChannel() {
    // create connection && channel
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }


  async publisher(data)  {
    if (!this.channel) {
        await this.createChannel();
      }
    // create exchange
    const exchangeName = config.rabbitMQ.exchangeName;
    let routingKey = "Info"
    console.log("reaching till here")
    //push the data
    await this.channel.assertExchange(exchangeName, "direct");
    await this.channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(data))
      );

      console.log("here is the data" , data)
      console.log(`customer name  : ${data.firstName} details has been sent to the exchange ${exchangeName}`)
  };

}

module.exports = Producer;

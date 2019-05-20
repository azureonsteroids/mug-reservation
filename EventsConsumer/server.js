const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");
const { busConnectionString, queueName } = require("./config/config");
const eventLib = require("./libs/eventLib");

const mongoose = require("mongoose");
const { mongoDbUrl } = require('./config/config');

mongoose.connect('mongodb://' + mongoDbUrl + '/mug').then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

async function main() {
  const ns = ServiceBusClient.createFromConnectionString(busConnectionString);
  const client = ns.createQueueClient(queueName);
  const receiver = client.createReceiver(ReceiveMode.peekLock);

  try {
    const messages = await receiver.receiveMessages(1, 5);
    if (!messages.length) {
      console.log("Waiting for new message");
      return;
    }
    console.log(`Received message #: ${messages[0].body.username}`);

    await messages[0].complete();
    await client.close();
    await eventLib.confirmedEvent(messages[0].body);  
  } catch (err) {
    console.error(err);
  } finally {
    await ns.close();
  }
}


setInterval(main, 6000);
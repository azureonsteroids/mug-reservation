const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");
const { busConnectionString, queueName } = require("./config/config");

async function main(connectionString) {
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
  } catch (err) {
    console.error(err);
  } finally {
    await ns.close();
  }
}


setInterval(main, 3000);
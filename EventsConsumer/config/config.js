// Variable definition 

const queueName = "mug-events-register";
const busConnectionString = process.env.BUS_CONNECTION_STRING ? process.env.BUS_CONNECTION_STRING : "Endpoint=sb://mug-service-bus-namespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=1Bmh1yQ/4AGwoQkOjXOQGm2ZATHFE6u3pT6y/Q+2RWY=";
const mongoDbUrl = process.env.MONGO_URL ? process.env.MONGO_URL : 'localhost';

module.exports = { busConnectionString, queueName, mongoDbUrl }
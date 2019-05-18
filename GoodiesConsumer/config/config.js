// Variable definition 

const queueName = "goodiesOrder";
const busConnectionString = process.env.BUS_CONNECTION_STRING ? process.env.serviceBus.connectionString : "Endpoint=sb://mug-service-bus-namespace.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=1Bmh1yQ/4AGwoQkOjXOQGm2ZATHFE6u3pT6y/Q+2RWY=";
const mongoDbUrl =  "localhost";

module.exports = { busConnectionString, queueName, mongoDbUrl }
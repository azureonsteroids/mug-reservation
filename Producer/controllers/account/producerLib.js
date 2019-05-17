const { ServiceBusClient } = require("@azure/service-bus");
const { busConnectionString, goodiesQueueName, eventsQueueName } = require('../../config/config');
const { GoodyOrder } = require ('../../schema/goodyOrderSchema');
const { EventRegister } = require ('../../schema/eventRegisterSchema');

function registerGoody(req, res) {
    if (!req.body.username || !req.body.goodyName) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {
        const ns = ServiceBusClient.createFromConnectionString(busConnectionString);

        const client = ns.createQueueClient(goodiesQueueName);
        const sender = client.createSender();

        try {
            const goodyOrder = {
                body: {
                    username: req.body.username,
                    goodyname: req.body.goodyName
                },
                label: "goody"
            };

            console.log(`Sending message: ${goodyOrder.body.username} - ${goodyOrder.body.goodyname}`);
            sender.send(goodyOrder);
            client.close();

            //TODO move me in a function !
            var findGoodyOrder = new Promise(function (resolve, reject) {
                GoodyRegister.findOne({
                    username: goodyOrder.body.username,
                    goodyname: goodyOrder.body.eventname
                }, function (err, result) {
                    if (err) {
                        reject(500);
                    } else {
                        if (result) {
                            reject(204)
                        } else {
                            resolve(true)
                        }
                    }
                })
            })

            findGoodyOrder.then(function () {
                // save the event registering if not already exist.
                goodyOrder.status = "PENDING";
                var _e = new EventRegister(goodyOrder.body);
                _e.save(function (err, event) {
                    if (err) {
                        res.status(500).json({
                            "text": "Internal Error"
                        })
                    } 
                })
            }, function (error) {
                switch (error) {
                    case 500:
                        res.status(500).json({
                            "text": "Internal error"
                        })
                        break;
                    case 204:
                        res.status(204).json({
                            "text": "You already order this goody"
                        })
                        break;
                    default:
                        res.status(500).json({
                            "text": "internal error"
                        })
                }
            })

            res.status(200).json(goodyOrder.body);
        } catch (err) {
            res.status(500).json({ error: err });
        } finally {
            ns.close();
        }
    }
}

function registerEvent(req, res) {
    if (!req.body.username || !req.body.eventName) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {
        const ns = ServiceBusClient.createFromConnectionString(busConnectionString);

        const client = ns.createQueueClient(eventsQueueName);
        const sender = client.createSender();

        try {
            const eventRegister = {
                body: {
                    username: req.body.username,
                    eventname: req.body.eventName
                },
                label: "event"
            };

            console.log(`Sending message: ${eventRegister.body.username} - ${eventRegister.body.eventname}`);
            sender.send(eventRegister);
            client.close();

            //TODO move me in a function !
            var findEventRegister = new Promise(function (resolve, reject) {
                EventRegister.findOne({
                    username: eventRegister.body.username,
                    eventname: eventRegister.body.eventname
                }, function (err, result) {
                    if (err) {
                        reject(500);
                    } else {
                        if (result) {
                            reject(204)
                        } else {
                            resolve(true)
                        }
                    }
                })
            })
    
            findEventRegister.then(function () {
                 // save the event registering if not already exist.
                eventRegister.status = "PENDING";
                var _e = new EventRegister(eventRegister.body);
                _e.save(function (err, event) {
                    if (err) {
                        res.status(500).json({
                            "text": "Internal Error"
                        })
                    } 
                })
            }, function (error) {
                switch (error) {
                    case 500:
                        res.status(500).json({
                            "text": "Internal error"
                        })
                        break;
                    case 204:
                        res.status(204).json({
                            "text": "You are already register to this event"
                        })
                        break;
                    default:
                        res.status(500).json({
                            "text": "internal error"
                        })
                }
            })
          

            res.status(200).send(eventRegister.body);
        } catch (err) {
            res.status(500).json({ error: err });
        } finally {
            ns.close();
        }
    }
}

exports.registerEvent = registerEvent;
exports.registerGoody = registerGoody;

const GoodyOrder = require ('../../schema/goodyOrderSchema');
const EventRegister = require ('../../schema/eventRegisterSchema');

function registerGoody(req, res) {
    if (!req.body.username || !req.body.goodyName) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {
        try {
            const goodyOrder = {
                body: {
                    username: req.body.username,
                    goodyname: req.body.goodyName
                },
                label: "goody"
            };

            //TODO move me in a function !
            var findGoodyOrder = new Promise(function (resolve, reject) {
                GoodyOrder.findOne({
                    username: goodyOrder.body.username,
                    goodyname: goodyOrder.body.goodyname
                }, function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result) {
                            reject(204)
                        } else {
                            resolve(true)
                        }
                    }
                })
            });

            findGoodyOrder.then(function () {
                // save the event registering if not already exist.
                goodyOrder.body.status = "CONFIRMED";
                var _g = new GoodyOrder(goodyOrder.body);
                _g.save(function (err, event) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            "text": "Internal Error"
                        })
                    }else{
                        res.status(200).json(goodyOrder.body);
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
                        break;
                }
            })
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
}

function registerEvent(req, res) {
    if (!req.body.username || !req.body.eventname) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {
        try {
            const eventRegister = {
                body: {
                    username: req.body.username,
                    eventname: req.body.eventname
                },
                label: "event"
            };

            //TODO move me in a function !
            var findEventRegister = new Promise(function (resolve, reject) {
                EventRegister.findOne({
                    username: eventRegister.body.username,
                    eventname: eventRegister.body.eventname
                }, function (err, result) {
                    if (err) {
                        console.log(err);
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
                eventRegister.body.status = "CONFIRMED";
                var _e = new EventRegister(eventRegister.body);
                _e.save(function (err, event) {
                    console.log(err);
                    if (err) {
                        res.status(500).json({
                            "text": "Internal Error"
                        })
                    } else {
                        res.status(200).send(eventRegister.body);
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
        } catch (err) {
            res.status(500).json({ error: err });
        }
    }
}

exports.registerEvent = registerEvent;
exports.registerGoody = registerGoody;

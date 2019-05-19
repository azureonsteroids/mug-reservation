const Event = require('../../schema/eventSchema.js');
const EventRegister = require('../../schema/eventRegisterSchema.js');

function findAll(req, res) {

    var find = new Promise(function (resolve, reject) {
        Event.find({}, function (err, result) {
            if (err) {
                reject(500);
            } else {
                if (result) {
                    resolve(result);
                } else {
                    reject(500);
                }
            }
        })
    });

    find.then(function (result) {
        res.status(200).json(result);
    }, function (error) {
        res.status(500).json({
            "text": "Internal error"
        })
    })

}

function findByUsername(req, res) {
    if (!req.query.username) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {
        var findByUsername = new Promise(function (resolve, reject) {
            EventRegister.find({username: req.query.username}, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(500);
                    }
                }
            })
        });

        findByUsername.then(function (result) {
            const pendingEvents = result.filter(r => r.status === "PENDING");
            const confirmedEvents = result.filter(r => r.status === "CONFIRMED");
            const message = {
                pendingEvents: pendingEvents,
                confirmedEvents: confirmedEvents
            }
            res.status(200).json(message);
        }, function (error) {
            res.status(500).json({
                "text": "Internal error"
            })
        })
    }
}


exports.findAll = findAll;
exports.findByUsername = findByUsername;
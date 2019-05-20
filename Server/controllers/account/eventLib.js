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


function bulkInsert(req, res) {
    Event.insertMany([
        {"name":"From ground to azure","description":"Accompagnez nous dans la préparation et le déploiement d'une infrastructure multi environnements grâce à Azure et Kubernetes. </br> #Azure #kubernetes #terraform #helm #scalability #operability #aks #infraAsCode </br> Le sujet sera présenté par Joani Couma et Axel Pereira de la société CGI. </br> La présentation sera suivi d'une collation où Joani et Axel pourront répondre à toutes vos questions.","eventDate":"2019-05-21T18:00:00.000+00:00"},
        {"name":"The next MUG presentation","description":"une autre superbe prez !","eventDate":"2019-05-29T18:00:00.000+00:00"}
    ]).then(() => {
        res.status(200).send();
    }).catch((error) => {
        res.status(500).json({text: error});
    });

}

exports.findAll = findAll;
exports.findByUsername = findByUsername;
exports.bulkInsert = bulkInsert;
const Goody = require('../../schema/goodySchema.js');
const GoodyOrder = require('../../schema/goodyOrderSchema.js');

function findAll(req, res) {

    var find = new Promise(function (resolve, reject) {
        Goody.find({}, function (err, result) {
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
            GoodyOrder.find({username: req.query.username}, function (err, result) {
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
            const pendingGoodies = result.filter(r => r.status === "PENDING");
            const confirmedGoodies = result.filter(r => r.status === "CONFIRMED");
            const message = {
                pendingGoodies: pendingGoodies,
                confirmedGoodies: confirmedGoodies 
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
    Goody.insertMany([
        {"name":"The original Mug","price":{"$numberDecimal":"4.12"},"description":"Petite tasse avec le logo du MUG"},
        {"name":"Porte clé the mug","price":{"$numberDecimal":"2.12"},"description":"le porte clé du mug !"},
        {"name":"Stickers PC MugInClermint","price":{"$numberDecimal":"0.20"},"description":"à coller sur tout vos PCs !"},
        {"name":"Porte badge MUG","price":{"$numberDecimal":"83.82"},"description":"Portez votre badge avec classe!"}
    ]).then(() => {
        res.status(200).send();
    }).catch((error) => {
        res.status(500).json({text: error});
    });
}

exports.findAll = findAll;
exports.findByUsername = findByUsername;
exports.bulkInsert = bulkInsert;

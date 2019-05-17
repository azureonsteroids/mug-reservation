const Goody = require('../../schema/goodySchema.js');

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

function orderOne(req, res) {
    res.status(404).json({ text: "Not implemented yet !"});
}

exports.findAll = findAll;
exports.orderOne = orderOne;

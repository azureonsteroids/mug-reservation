const GoodyOrder = require('../schema/goodyOrderSchema');

function confirmedGoody(goody) {
    if (!goody) {
        return;
    } else {
        var query ={
            username: goody.username,
            goodyname: goody.goodyname
        };
        goody.status = "CONFIRMED";
        GoodyOrder.findOneAndUpdate(query, goody, function(err, doc){
            if (err) return res.send(500, { error: err });
            return console.log("succesfully saved");
        });
    }
}

exports.confirmedGoody = confirmedGoody;

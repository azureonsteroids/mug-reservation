const EventRegister = require('../schema/eventRegisterSchema');

function confirmedEvent(event) {
    if (!event) {
        return;
    } else {
        var query ={
            username: event.username,
            eventname: event.eventname
        };
        event.status = "CONFIRMED";
        EventRegister.findOneAndUpdate(query, event, function(err, doc){
            if (err) return res.send(500, { error: err });
            return console.log("succesfully saved");
        });
    }
}

exports.confirmedEvent = confirmedEvent;

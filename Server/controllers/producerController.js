const producerLib = require('./account/producerLib.js');

module.exports = function (app) {
    // TODO: Authentification part
    app.post('/order/goody',producerLib.registerGoody);
    app.post('/register/event',producerLib.registerEvent);
}

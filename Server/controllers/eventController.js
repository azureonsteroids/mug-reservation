const eventLib = require('./account/eventLib.js');

module.exports = function (app) {
    // TODO: Authentification part
    app.get('/all',eventLib.findAll);
    app.get('/registered', eventLib.findByUsername);
}

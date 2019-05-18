const goodyLib = require('./account/goodyLib.js');

module.exports = function (app) {
    // TODO: Authentification part
    app.get('/all',goodyLib.findAll);
    app.get('/ordered', goodyLib.findByUsername);
}

const account = require('./account/userLib.js');

module.exports = function (app) {
    app.post('/login',account.login);
    app.post('/signup',account.signup);
}

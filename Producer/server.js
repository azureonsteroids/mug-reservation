const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const { mongoDbUrl } = require('./config/config');

mongoose.connect('mongodb://' + mongoDbUrl + '/mug').then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

const app = express();

//Body Parser
var urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var router = express.Router();
app.use('/', router);
require(__dirname + '/controllers/producerController')(router);

var port = 8002;
app.listen(port, () => console.log(`Listening on port ${port}`));
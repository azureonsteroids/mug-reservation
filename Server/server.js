const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const config = require('./config/config');

mongoose.connect('mongodb://' + config.mongoDb.url + '/mug').then(() => {
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
app.use('/user', router);
require(__dirname + '/controllers/userController')(router);

app.get('/', (req, res) => {
    return res.status(200).json({
        "text": "coucou "
    })
})

var port = 8001;
app.listen(port, () => console.log(`Listening on port ${port}`));
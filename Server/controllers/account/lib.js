const User = require('../../schema/userSchema.js');
const passwordHash = require("password-hash");

function signup(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {
        var user = {
            email: req.body.email,
            password: passwordHash.generate(req.body.password)
        }
        var findUser = new Promise(function (resolve, reject) {
            User.findOne({
                email: user.email
            }, function (err, result) {
                if (err) {
                    reject(500);
                } else {
                    if (result) {
                        reject(204)
                    } else {
                        resolve(true)
                    }
                }
            })
        })

        findUser.then(function () {
            var _u = new User(user);
            _u.save(function (err, user) {
                if (err) {
                    res.status(500).json({
                        "text": "Internal Error"
                    })
                } else {
                    res.status(200).json({
                        "text": "Succes",
                        "token": user.getToken()
                    })
                }
            })
        }, function (error) {
            switch (error) {
                case 500:
                    res.status(500).json({
                        "text": "Internal error"
                    })
                    break;
                case 204:
                    res.status(204).json({
                        "text": "mail already used"
                    })
                    break;
                default:
                    res.status(500).json({
                        "text": "internal error"
                    })
            }
        })
    }
}

function login(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({
            "text": "Invalid request"
        })
    } else {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                res.status(500).json({
                    "text": "Internal error"
                })
            }
            else if(!user){
                res.status(401).json({
                    "text": "User doesn't exists"
                })
            }
            else {
                if (user.authenticate(req.body.password)) {
                    res.status(200).json({
                        "token": user.getToken(),
                        "text": "Authentificated"
                    })
                }
                else{
                    res.status(401).json({
                        "text": "Incorrect password"
                    })
                }
            }
        })
    }
}

exports.login = login;
exports.signup = signup;

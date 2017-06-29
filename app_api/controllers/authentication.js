var db = require('../db.js');
var User = db.user;
var _ = require('underscore');


module.exports.register = function(req, res) {
    var body = req.body;
    var body = _.pick(body,'email','password');
    if(!_.isString(body.email) || !_.isString(body.password) || body.email.length == 0 ||  body.password.length == 0){
        res.status(404).send();
    }
    else{
        body.email = body.email.trim();
        body.password = body.password.trim();

        User.create(body).then(function(user){
            if(user){
                res.json(user.toPublicJSON());
            }
            else{
                res.status(400).json("User not created");
            }
        },function(e){
             res.status(400).json(e);
        })
        .catch(function(e){
            res.status(500).json(e);
            console.log("error creating user:",e);
        });
    }

};

module.exports.login = function(req, res) {
    var body = req.body;
    var body = _.pick(body,'email','password');
    User.authenticate(body).then(function(user){
        var token = user.generateToken('authentication');
        if(token){
            res.header('Auth',token).json(user.toPublicJSON());
        }
        else{
            res.status(401).json(e);    
        }
    },function(e){
        res.status(401).json(e);
    })
};
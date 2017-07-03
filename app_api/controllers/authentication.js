var db = require('../db.js');
var User = db.user;
var _ = require('underscore');
var middleware = require('./middleware')(db);

module.exports.register = function(req, res) {
    var body = req.body;
    var body = _.pick(body,'email','password');
    if(!_.isString(body.email) || !_.isString(body.password) || body.email.length == 0 ||  body.password.length == 0){
        res.status(404).send();
    }
    else{
        body.email = body.email.trim();
        body.password = body.password.trim();
        db.user.create(body).then(function(user){
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
    var userInstance;
    db.user.authenticate(body).then(function(user){
        var token = user.generateToken('authentication');
        userInstance = user;
        return db.token.create({
            token:token
        });
    }).then(function(tokenInstance){
        res.header('Auth',tokenInstance.get('token')).json(userInstance.toPublicJSON());
    }).catch(function(e){
        res.status(401).json(e);
    });
};

module.exports.logout = function(req, res) {
    //delete the token instance
    req.token.destroy().then(function(){
        res.status(204).send();
    }).catch(function(){
        res.status(500).send();
    });
};
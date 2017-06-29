
var bcrypt = require('bcrypt');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: [7, 15],
            },
            set: function (value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPasswd = bcrypt.hashSync(value, salt);
                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPasswd);
            }
        }
    }, {
            hooks: {
                beforeValidate: function (user, options) {
                    if (user.email && typeof (user.email) == 'string') {
                        user.email = user.email.toLowerCase();
                    }
                }
            },
            classMethods: {
                findByToken:function(token){
                    return new Promise(function(resolve,reject){
                        try{
                            var decodedJwt = jwt.verify(token,'qwerty098');
                            var bytes = cryptojs.AES.decrypt(decodedJwt.token,'abc123!@#');
                            var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));
                            user.findById(tokenData.id).then(function(user){
                                if(user){
                                    resolve(user);
                                }
                                else{
                                    reject();
                                }
                            },function(e){
                                reject();
                            });
                        }
                        catch(e){
                            reject();
                        }
                    });
                },
                authenticate: function (body) {
                    return new Promise(function (resolve, reject) {
                        if (!_.isString(body.email) || !_.isString(body.password)) {
                            return reject();
                        }
                        else {
                            body.email = body.email.trim();
                            body.password = body.password.trim();

                            user.findOne({
                                where: {
                                    email: body.email
                                }
                            }).then(function (user) {
                                if (user && bcrypt.compareSync(body.password, user.get("password_hash"))) {
                                    resolve(user);
                                }
                                else {
                                   return reject();
                                }
                            }, function (e) {
                                   reject();
                            })
                            .catch(function (e) {
                                 reject();
                            });
                        }
                    })
                }
            },
            instanceMethods: {
                generateToken:function(type){
                    if(!_.isString(type)){
                        return undefined;
                    }
                    try{
                        var stringData = JSON.stringify({id:this.get('id'),type:type});
                        var encryptedData = cryptojs.AES.encrypt(stringData,'abc123!@#').toString();
                        var token = jwt.sign({token:encryptedData},'qwerty098');
                        return token;
                    }
                    catch(e){
                        return undefined;
                    }
                },
                toPublicJSON: function () {
                    var json = this.toJSON();
                    return _.pick(json, "id", "email", "createdAt", "updatedAt");
                }
            }
        });
    return user;
}
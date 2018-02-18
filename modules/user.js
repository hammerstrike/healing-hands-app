var Promise = require('bluebird');
var UserModel = require('../db/schema/schema.user');
var bcrypt = require('bcryptjs');
var JWT = require('jsonwebtoken');

var User = {

    login: function (loginData) {

        var query = {
            username:loginData.username
        };

        return new Promise(function (resolve, reject) {

            UserModel
                .findOne(query, function (err, userData) {
                    
                    //IF Error
                    if (err) {
                        reject({error : err});
                        return;
                    }
                    //IF no user data
                    if (!userData || (userData==null)) {
                        reject('No User found');
                        return;
                    }

                    //Chek for password
                    var passwordIsValid = bcrypt.compareSync(loginData.password, userData.password);

                    //IF password is not valid
                    if (!passwordIsValid) {
                        reject('Invalid Creds');  
                        return;                      
                    }

                    // if user is found and password is valid
                    // create a token
                    var token = JWT.sign({
                        id: userData.userId,
                        type: userData.userType
                    }, process.env.JWT_SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    // return the information including token as JSON
                    resolve({
                        token: token,
                        data : {
                            auth: true,
                            user: {
                                userType : userData.userType,
                                firstname : userData.firstname,
                                lastname : userData.lastname,
                                username : userData.username
                            }
                        }
                    });

                })
        })
    },

    register: function (newUserData) {

        var newUser = new UserModel(newUserData);

        return new Promise(function (resolve, reject) {
            
            newUser.save()
                .then(function (userData) {
                    
                     var token = JWT.sign({
                        id: userData.userId,
                        type: userData.userType
                    }, process.env.JWT_SECRET, {
                        expiresIn: 86400 // expires in 24 hours
                    });

                    resolve({
                        auth: true,
                        token: token,
                        user:userData
                    });
                    
                }, function (reason) {
                    reject(reason);
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    },

    auth: function (userId) {
        var query = {userId :userId}
        return new Promise(function (resolve, reject) {
            UserModel.findOne(query, { password: 0, timestamp: 0, _id : 0  }, function (err, user) {
                if (err) reject({auth : false , message : err});
                if (!user) reject({auth : false , message : 'No such user'});
                resolve({auth : true , user : user});
            });
        })
    }
}

module.exports = User;
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
                    if (err) reject(err);

                    //IF no user data
                    if (!userData) resolve('No user found.');

                    //Chek for password
                    var passwordIsValid = bcrypt.compareSync(loginData.password, userData.password);

                    //IF password is not valid
                    if (!passwordIsValid) resolve({
                        auth: false,
                        token: null
                    });

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

    getUser: function (userId) {

        UserModel.findById(userId, { password: 0 }, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            res.status(200).send(user);
        });
    }
}

module.exports = User;
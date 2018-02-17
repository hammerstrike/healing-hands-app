var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var VerifyToken = require('../modules/verify-token')
var User = require('../modules/user.js')

/* User Login*/
router.post('/login', function (req, res) {

    User.login({ username: req.body.username, password: req.body.password }).then(function (result) {
        res.set('x-auth-token', result.token );
        res.json({
            status: "success",
            data: result.data
        });
    }, function (reason) {
        res.json({
            status: "fail",
            data: reason
        });
    })
    .catch(function (reason) {
        res.json({
            status: "fail",
            data: reason
        });
    })
});

/* User Registration */
router.post('/register', function (req, res) {

    User.register({
        userId: "",
        userType: req.body.userType,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(function (result) {
        res.json({
            status: "success",
            data: result
        });
    }, function (reason) {
        res.json({
            status: "fail",
            data: reason
        });
    })
    .catch(function (reason) {
        res.json({
            status: "fail",
            data: reason
        });
    })
});

//Get User
router.get('/me', VerifyToken, function (req, res) {

    User.getUser(req.userId).then(function (result) {
        res.json({
            status: "success",
            data: result
        });
    }, function (reason) {
        res.json({
            status: "fail",
            data: reason
        });
    })
    .catch(function (reason) {
        res.json({
            status: "fail",
            data: reason
        });
    })

})

module.exports = router;
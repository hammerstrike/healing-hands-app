var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var VerifyToken = require('../modules/verify-token')
var Patient = require('../modules/patient.js')

/* Patient Get*/
router.post('/get',VerifyToken, function (req, res) {
    var query = req.body.query || {};
    Patient.getPatient(query).then(function (result) {
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

/* Patient Save */
router.post('/save',VerifyToken, function (req, res) {

    Patient.savePatient({
        patientId : "",
        patientName : req.body.patientName,
        age : req.body.age,
        sex : req.body.sex,
        emailId : req.body.emailId,
        contactNo :  req.body.contactNo,
        allergicTo : req.body.allergicTo,
        habits : req.body.habits,
        medicalHistory : req.body.medicalHistory,
        drugHistory : req.body.drugHistory,
        isPregnant : req.body.isPregnant,
        additionalInfo : req.body.additionalInfo,
        refferedBy : req.body.refferedBy,
        addedBy : req.userId,
       
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

module.exports = router;
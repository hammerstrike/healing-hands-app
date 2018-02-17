var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var VerifyToken = require('../modules/verify-token')
var Patient = require('../modules/patient.js')

/* Patient Get*/
router.post('/get',VerifyToken, function (req, res) {
    var query = req.body.query || {};

    Patient.getPatient({$and: [query, { addedBy : req.userId } ]}).then(function (result) {
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
        refferedBy : req.body.refferedBy,
        procedureTreatment : req.body.procedureTreatment,
        amountPaid : req.body.amountPaid,
        amountTotal : req.body.amountTotal,
        addedBy : req.userId,
        additionalInfo : req.body.additionalInfo
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
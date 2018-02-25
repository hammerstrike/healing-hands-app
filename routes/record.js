var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var VerifyToken = require('../modules/verify-token')
var Record = require('../modules/record.js')

/* Record Get*/
router.post('/get',VerifyToken, function (req, res) {
    
    Record.getRecord({ "addedBy": req.userId, "endDate" : req.body.filters.endDate }).then(function (result) {
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

/* Record Save */
router.post('/save',VerifyToken, function (req, res) {

    Record.saveRecord({
        
        recordId : "",
        patientId : req.body.patientId,
        procedureTreatment : req.body.procedureTreatment,
        diagnosis : req.body.diagnosis,
        amountPaid : req.body.amountPaid,
        amountTotal : req.body.amountTotal,
        additionalInfo : req.body.additionalInfo,
        addedBy : req.userId

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
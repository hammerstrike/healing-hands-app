var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

var VerifyToken = require('../modules/verify-token')
var Patient = require('../modules/patient.js')

/* Patient Get*/
router.post('/get',VerifyToken, function (req, res) {
    console.log(req.body.filters);

    var startDate = req.body.filters.endDate,
        endDate = req.body.filters.endDate,
        
        query = {
            $and: [
                { "timestamp": { "$gte" : new Date(2018,1,16), "$lt" : new Date(2018,1,17)}}, 
                { "addedBy": req.userId }
            ]
        };

        console.log("startDate:",startDate);
        console.log("endDate:",endDate);

        function startDate(d){
           
        }

        function endDate(d){     
           
        }

    Patient.getPatient({ "addedBy": req.userId }).then(function (result) {
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
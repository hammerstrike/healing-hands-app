var Promise = require('bluebird');
var PatientModel = require('../db/schema/schema.patient');

var Patient = {

    getPatient : function(query){
        var query = query || {};
        return new Promise(function(resolve, reject) {
            PatientModel
                .find(query,function(err,patientData){
                    resolve(patientData);
                })
        })
    },

    savePatient : function(data){        

        var newPatientData = new PatientModel(data);
        console.log("patient:19",newPatientData);

        return new Promise(function(resolve, reject) {
            newPatientData.save()
                .then(function (patientData) {
                    console.log("patient:24",patientData);
                    resolve(patientData);
                })
                .catch(function(err){
                    console.log("patient:28",err);
                    reject(err)
                })
        })
    }
}

module.exports = Patient;
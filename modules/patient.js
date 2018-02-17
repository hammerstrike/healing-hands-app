var Promise = require('bluebird');
var PatientModel = require('../db/schema/schema.patient');

var Patient = {

    getPatient : function(query){
        var query = query || {};
        return new Promise(function(resolve, reject) {
            PatientModel
                .find(query,{_id : 0},function(err,patientData){
                    resolve(patientData);
                })
        })
    },

    savePatient : function(data){

        var newPatientData = new PatientModel(data);       

        return new Promise(function(resolve, reject) {
            newPatientData.save()
                .then(function (patientData) {                    
                    resolve(patientData);
                })
                .catch(function(err){                    
                    reject(err)
                })
        })
    }
}

module.exports = Patient;
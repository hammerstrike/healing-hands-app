var Promise = require('bluebird');
var RecordModel = require('../db/schema/schema.record');
var PatientModel = require('../db/schema/schema.patient');
var moment = require('moment');

var Record = {

    getRecord: function (query) {
        return new Promise(function (resolve, reject) {
            // RecordModel
            //     .find(query, { _id: 0 }, function (err, recordData) {
            //         resolve(recordData);
            //     })
        
            console.log("End Date",moment(query.endDate).endOf('day'));

            var endDate =moment(query.endDate).endOf('day');    
            var startDate = moment(endDate).subtract(1, 'days');
               
            PatientModel
                .aggregate([
                    {
                        $lookup: {
                            from: 'Record',
                            localField: 'patientId',
                            foreignField: 'patientId',
                            as: "records"
                        }
                    },                   
                    {
                        $match: {
                            $and: [                               
                                {"records.addedBy"      : { $eq : query.addedBy}}, 
                                {"records.timestamp"    : { $gte: new Date(startDate)}},
                                {"records.timestamp"    : { $lt : new Date(endDate) }}
                            ]}
                    },
                    {
                        "$project": {
                            
                            "patientId": 1,
                            "patientName": 1,
                            "age": 1,
                            "sex": 1,
                            "emailId": 1,
                            "contactNo": 1,
                            "allergicTo": 1,
                            "habits": 1,
                            "medicalHistory": 1,
                            "drugHistory": 1,
                            "isPregnant": 1,
                            "additionalInfo": 1,
                            "refferedBy": 1,
                            "addedBy": 1,
                            
                            "records": {                                
                               "$filter": {                                    
                                    "input": "$records",
                                    "as": "record",
                                    "cond": { 
                                        //"$eq": ["$$record.addedBy",query.addedBy],                                      
                                        "$and":[ 
                                            { "$eq": ["$$record.addedBy",query.addedBy] },
                                            { "$gte": ["$$record.timestamp", new Date(startDate)]},
                                            { "$lt": ["$$record.timestamp", new Date(endDate)]}
                                        ]
                                    }                                    
                                }                                
                            }                            
                        }
                    }
                ], function (err, patientData) {
                    resolve(patientData);
                })

        })
    },

    saveRecord: function (data) {

        var newRecordData = new RecordModel(data);

        return new Promise(function (resolve, reject) {
            newRecordData.save()
                .then(function (recordData) {
                    resolve(recordData);
                })
                .catch(function (err) {
                    reject(err)
                })
        })
    }
}

module.exports = Record;
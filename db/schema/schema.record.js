var mongoose = require('../../modules/mongoose');
var Counter = require('./schema.counter');

var RecordSchema = new mongoose.Schema({

    recordId : {
        type: String,       
        unique : true,
        required : true
    },
    patientId : {
        type: String,
        required : true
    },
    procedureTreatment : {
        type: String,
        default : ""
       // required : true
    },
    diagnosis : {
        type: String,
        default : ""
    },
    amountPaid : {
        type: Number,
        required : true
    },
    amountTotal : {
        type: Number,
        required : true
    },
    addedBy : {
        type: String,
        required : true
    },
    additionalInfo : {
        type: String,
        default : ""
    },
    timestamp : {
        type : Date,
        required : true,
        default : new Date().toISOString()
    }
},{ collection : 'Record' });

RecordSchema.pre('validate', function(next) {
    var record = this;

    Counter.findByIdAndUpdate({ _id: 'recordId' }, { $inc: { count: 1 } }, function (error, recordCounter) {
        if(error){
            return next(error);
        }
        record.recordId = recordCounter.prefix + recordCounter.count;
        next();
    });
});

var record = mongoose.model('record', RecordSchema);
module.exports = record;
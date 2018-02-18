var mongoose = require('../../modules/mongoose');
var Counter = require('./schema.counter');

var PatientSchema = new mongoose.Schema({
   
    patientId : {
        type: String,       
        unique : true,
        required : true
    },

    patientName : {
        type: String,      
        required : true
    },

    age : {
        type: Number,
        required : true
    },

    sex : {
        type: String,
        required : true
    },
    refferedBy : {
        type: String,
        required : true
    },
    procedureTreatment : {
        type: String,
        required : true
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
        default : new Date()
    }

},{ collection : 'patient' });

PatientSchema.pre('validate', function(next) {
    var patient = this;

    Counter.findByIdAndUpdate({ _id: 'patientId' }, { $inc: { count: 1 } }, function (error, patientCounter) {
        if(error){
            return next(error);
        }
        patient.patientId = patientCounter.prefix + patientCounter.count;
        next();
    });
});

var patient = mongoose.model('patient', PatientSchema);
module.exports = patient;
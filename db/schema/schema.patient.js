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
        default : ""
       // required : true
    },
    contactNo : {
        type: String,
        validate: {
            validator: function (v) {
                return ((v.length) == 10);
            },
            message: '{VALUE} Invalid Phone Number! Should be 10 Digit!'
        },
        default : ""
    },
    emailId : {
        type: String,
        default : ""
    },
    medicalHistory : {
        type: String,
        default : ""
    },
    drugHistory : {
        type: String,
        default : ""
    },
    allergicTo : {
        type: String,
        default : ""
    },
    habits : {
        type: String,
        default : ""
    },
    isPregnant : {
        type: Boolean,
        default : false
    },
    additionalInfo : {
        type: String,
        default : ""
    },
    addedBy : {
        type: String,
        required : true
    },
    timestamp : {
        type : Date,
        required : true,
        default : new Date().toISOString()
    }

},{ collection : 'Patient' });

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
var mongoose = require('../../modules/mongoose');
var Counter = require('./schema.counter');

var UserSchema = new mongoose.Schema({
    
    userId : {
        type: String,
        unique : true,
        required : true
    },

    userType : {
        type: Number,
        required : true
    },

    firstname : {
        type: String,
        required : true
    },

    lastname : {
        type: String,
        required : true
    },

    username : {
        type: String,
        unique : true,
        required : true
    },

    password : {
        type: String,
        required : true
    },

    timestamp : {
        type : Date,
        required : true,
        default : new Date()
    }

},{ collection : 'User' });

UserSchema.pre('validate', function(next) {
    var User = this;

    Counter.findByIdAndUpdate({ _id: 'userId' }, { $inc: { count: 1 } }, function (error, userCounter) {
        if(error){
            return next(error);
        }
        User.userId = userCounter.prefix + userCounter.count;
        
        next();
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
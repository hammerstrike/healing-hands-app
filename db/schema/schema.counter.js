var mongoose = require('mongoose');

var CounterSchema = new mongoose.Schema({
     _id: {
         type: String, 
         required: true
    },
    count: { 
        type: Number, 
        default: 0 
    },
    prefix : {
        type : String,
         required: true
    }
},{ collection : 'counter' });

var Counter = mongoose.model('Counter', CounterSchema);
module.exports = Counter
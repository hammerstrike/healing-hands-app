var mongoose = require('mongoose');
var Promise = require('bluebird');

mongoose.Promise = Promise;

var options = {
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 3000, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
};

mongoose.connect(process.env.MONGODB_URI,options).then(function () {
    console.log('Connected to DB')
}, function (err) {
    console.log(err);
});

module.exports = mongoose;
var env     = process.env.NODE_ENV || 'development'; //staging / test
var config  = require('./config.json');

for (key in config[env]) {
  process.env[key] = config[env][key];
}
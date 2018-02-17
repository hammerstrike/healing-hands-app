var env     = process.env.NODE_ENV || 'development';
var config  = require('./config.json');

switch(env){
  
  case 'development':
    for (key in config['development']) {
      process.env[key] = config[env][key];
    }
  break;

  case 'staging':
    process.env['MONGODB_URI'] = process.env.MONGODB_URI;
    process.env['JWT_SECRET'] = process.env.JWT_SECRET;
  break;
}
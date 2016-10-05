var bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: 'Expense Manager',
  streams: [
  	{
  		level: 'info',
  		path: 'logs/bunyan.log'
  	}
  ]
});

module.exports = log;
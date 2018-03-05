var nconf = require('nconf');

nconf.argv()
	.env()
	.file({
		file: process.cwd() + '/src/libs/config.json'
	});

module.exports = nconf;
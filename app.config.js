const argv = require('yargs').argv;

exports.MONGODB = {
	uri: `mongodb://127.0.0.1:${argv.dbport || '27017'}/NodePress`,
	username: argv.db_username || 'DB_username',
	password: argv.db_password || 'DB_password'
};

exports.AUTH = {
	data: argv.auth_data || { user: 'root' },
	jwtTokenSecret: argv.auth_key || 'nodeAPI',
	defaultPassword: argv.auth_default_password || 'root'
};

exports.APP = {
	ROOT_PATH: __dirname,
	LIMIT: 16,
	PORT: 8000
};


exports.MYSQL = {
  host: '127.0.0.1',
  port: 3306,
  dialect: 'mysql',
  database: 'c_test',
  username: 'root',
  password: 'Chen1047',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
      underscored: true,
      timestamps: false
  },
  timezone: '+08:00'
}

exports.INFO = {
	name: 'NodeAPI',
	version: '1.0.0',
	author: 'Chenney',
	github: 'https://github.com/superchenney',
	powered: ['Nodejs', 'MongoDB', 'Express', 'Nginx']
};

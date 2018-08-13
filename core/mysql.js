/*
*
*  数据库模块
*
*/

const Sequelize = require('sequelize');
const config	 = require('app.config');
Sequelize.Promise = global.Promise;

exports.Sequelize = Sequelize;


// 数据库
exports.connect = () => {

	const sequelize = new Sequelize(config.MYSQL.database, config.MYSQL.username,config.MYSQL.password, config.MYSQL);

	sequelize
	  .authenticate()
	  .then(() => {
	    console.log('MySQL Connection has been established successfully.');
	  })
	  .catch(err => {
	    console.error('Unable to connect to the MySQL database:', err);
	  });

	return sequelize;
};




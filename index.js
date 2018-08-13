'use strict';

// import
const http = require('http');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


// const morgan = require('morgan');
// const fs = require('fs');
// const path = require('path');
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

require('app-module-path').addPath(__dirname + '/');


// app modules
const config = require('app.config');
const routes = require('core/routes');
const mongodb = require('core/mongodb');
const mysql = require('core/mysql');
const app = express();





// data server
// mongodb.connect();
mysql.connect();

// global options
// mongoosePaginate.paginate.options = {
// 	limit: config.APP.LIMIT
// };

// app config
app.set('port', config.APP.PORT);
app.use(helmet());
// app.use(morgan('short', {stream: accessLogStream}));

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

// app routes
routes(app);

// Start server
http.createServer(app).listen(app.get('port'), () => {
	console.log(`NodeAPI Service Run！port at ${app.get('port')}, env: ${process.env.NODE_ENV}`)
});

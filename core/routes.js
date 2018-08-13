/*
*
* 路由模块
*
*/

const config = require('app.config');

const controller = require('controller');
const authIsVerified = require('utils/auth');

const routes = app => {

	// 拦截器
	app.all('*', (req, res, next) => {

		// production env
		const isProduction = Object.is(process.env.NODE_ENV, 'production');

		// Set Header
		const allowedOrigins = ['https://supre.cc', 'https://admin.supre.cc'];

		const origin = req.headers.origin || '';
		if (!isProduction) {
			allowedOrigins.push(origin);
		};
		if (allowedOrigins.includes(origin)) {
			res.setHeader('Access-Control-Allow-Origin', origin);
		};
		res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
		res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS');
		res.header('Access-Control-Max-Age', '1728000');
		res.header('Content-Type', 'application/json;charset=utf-8');
		res.header('X-Powered-By', 'NodeAPI 1.0.0');

		// OPTIONS
		if (req.method == 'OPTIONS') {
			res.sendStatus(200);
			return false;
		};

		// 如果是生产环境，需要验证用户来源渠道，防止非正常请求
		if (isProduction) {
			const { origin, referer } = req.headers;
			const originVerified = (!origin	|| origin.includes('supre.cc')) && 
														 (!referer || referer.includes('supre.cc'))
			if (!originVerified) {
				res.status(403).jsonp({ code: 0, message: '非正常请求!' })
				return false;
			};
		};



		next();
	});



	// Api
	app.get('/', (req, res) => {
		// console.log('Cookies: ', req.cookies)
		// res.cookie('isVisit', 1, {maxAge: 60 * 1000});

		res.jsonp(config.INFO);
	});

	// Auth
	app.all('/auth', controller.auth);






	// 404
	app.all('*', (req, res) => {
		res.status(404).jsonp({
			code: 0,
			message: '无效的API请求'
		})
	});
};

module.exports = routes;

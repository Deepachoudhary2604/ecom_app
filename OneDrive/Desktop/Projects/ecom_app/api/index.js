const serverless = require('serverless-http');
const app = require('../app');

const handler = serverless(app);

module.exports = (req, res) => {
	try {
		console.log('[api/index] invoked:', req.method, req.url);
		const result = handler(req, res);
		// handler may return a promise for some runtimes — attach a catch just in case
		if (result && typeof result.then === 'function') {
			result.catch(err => {
				console.error('[api/index] handler promise rejected:', err);
				if (!res.headersSent) {
					res.statusCode = 500;
					res.end('Internal Server Error');
				}
			});
		}
		return result;
	} catch (err) {
		console.error('[api/index] handler threw:', err);
		if (!res.headersSent) {
			res.statusCode = 500;
			res.end('Internal Server Error');
		}
	}
};

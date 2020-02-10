const paramCheckMiddleware = require('./param-check.middleware');

describe('Parameter check middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = paramCheckMiddleware();
		expect(typeof middleware).toBe('function');
	});
});

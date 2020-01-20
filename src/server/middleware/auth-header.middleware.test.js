const authHeaderMiddleware = require('./auth-header.middleware');
const { authConfig } = require('../../config');

describe('Authorization Header middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = authHeaderMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should allow access if bearer key in array', () => {
		const middleware = authHeaderMiddleware(authConfig.api_keys);
		const req = { token: 'Jimini' };
		const res = {};
		const next = jest.fn();

		middleware(req, res, next);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should deny access if bearer key not in array', () => {
		const middleware = authHeaderMiddleware(authConfig.api_keys);
		const req = { token: 'Pinocchio' };
		const res = {};
		const next = jest.fn();

		middleware(req, res, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].status).toBe(401);
	});

	test('Should deny access if bearer key missing', () => {
		const middleware = authHeaderMiddleware(authConfig.api_keys);
		const req = {};
		const res = {};
		const next = jest.fn();

		middleware(req, res, next);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].status).toBe(401);
	});
});

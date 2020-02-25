/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable jest/expect-expect */
const httpMocks = require('node-mocks-http');
const fhirBinaryMiddleware = require('../middleware/fhir-binary-resource.middleware');

const args = {
	id: '1'
};

describe('FHIR Binary resource middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = fhirBinaryMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should pass an error to next if mandatory value is missing', () => {
		const middleware = fhirBinaryMiddleware();

		const query = {};
		const req = httpMocks.createRequest({
			method: 'PUT',
			body: Object.assign(query, args)
		});
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);
		expect(next.mock.calls[0][0]).toBe('File missing from request');
		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
	});
});

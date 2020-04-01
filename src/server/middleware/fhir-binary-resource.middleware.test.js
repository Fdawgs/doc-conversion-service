const fs = require('fs');
const httpMocks = require('node-mocks-http');
const fhirBinaryMiddleware = require('./fhir-binary-resource.middleware');

const file = {
	buffer: fs.readFileSync('./test_files/tester_bullet_issues-html.html'),
	mimetype: 'application/html'
};

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

	test('Should return FHIR resource if req.resource already present', () => {
		const middleware = fhirBinaryMiddleware();

		const query = {};
		const req = {
			method: 'PUT',
			body: Object.assign(query, args),
			file,
			resource: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);
		expect(typeof req.resource).toBe('object');
		expect(typeof req.resource.binary).not.toBe('undefined');
		expect(req.resource.binary.id).toBe(args.id);
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should return FHIR resource and create own req.resource object', () => {
		const middleware = fhirBinaryMiddleware();

		const query = {};
		const req = {
			method: 'PUT',
			body: Object.assign(query, args),
			file
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);
		expect(typeof req.resource).toBe('object');
		expect(typeof req.resource.binary).not.toBe('undefined');
		expect(req.resource.binary.id).toBe(args.id);
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should return FHIR resource if id argument not present in body', () => {
		const middleware = fhirBinaryMiddleware();

		const req = {
			method: 'PUT',
			file,
			resource: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);
		expect(typeof req.resource).toBe('object');
		expect(typeof req.resource.binary).not.toBe('undefined');
		expect(typeof req.resource.binary.id).toBe('string');
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
	});
});

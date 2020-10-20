const faker = require('faker');
const fs = require('fs');
const httpMocks = require('node-mocks-http');
const Middleware = require('./fhir-binary-resource.middleware');

const file = {
	buffer: fs.readFileSync('./test_files/tester_bullet_issues-html.html'),
	mimetype: 'application/html'
};

const args = {
	id: faker.random.uuid()
};

describe('FHIR Binary resource middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe('function');
	});

	test('Should return FHIR resource if res.locals.resource object already present', () => {
		const middleware = Middleware();
		const query = {};
		const req = httpMocks.createRequest({
			method: 'PUT',
			body: Object.assign(query, args),
			file
		});
		const res = httpMocks.createResponse({ locals: { resource: {} } });
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({
			resource: {
				binary: {
					id: args.id
				}
			}
		});
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should return FHIR resource and create own res.locals.resource object', () => {
		const middleware = Middleware();
		const query = {};
		const req = httpMocks.createRequest({
			method: 'PUT',
			body: Object.assign(query, args),
			file
		});
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({
			resource: {
				binary: {
					id: args.id
				}
			}
		});
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should return FHIR resource if id argument not present in body', () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest({
			method: 'PUT',
			file
		});
		const res = httpMocks.createResponse({ locals: { resource: {} } });
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({
			resource: {
				binary: {
					id: expect.any(String)
				}
			}
		});
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should pass an error to next if mandatory value is missing', () => {
		const middleware = Middleware();

		const query = {};
		const req = httpMocks.createRequest({
			method: 'PUT',
			body: Object.assign(query, args)
		});

		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals.resource).toBeUndefined();
		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe('File missing from request');
	});
});

const fs = require('fs');
const httpMocks = require('node-mocks-http');
const fhirDocumentReferenceMiddleware = require('./fhir-documentreference-resource.middleware');

const files = [
	{
		buffer: fs.readFileSync('./test_files/tester_bullet_issues-html.html'),
		mimetype: 'application/html'
	}
];

const args = {
	id: '1',
	subject: '999999',
	type: 'Discharge Summary',
	specialty: 'Cardiology',
	status: 'current'
};

describe('FHIR DocumentReference resource middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = fhirDocumentReferenceMiddleware();

		expect(typeof middleware).toBe('function');
	});

	test('Should pass an error to next if mandatory value is missing', () => {
		const middleware = fhirDocumentReferenceMiddleware();

		const query = {};
		const req = httpMocks.createRequest({
			method: 'PUT',
			body: Object.assign(query, args)
		});

		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe('File missing from request');
	});

	test('Should return FHIR resource if res.locals.resource already present', () => {
		const middleware = fhirDocumentReferenceMiddleware();

		const query = {};
		const req = {
			method: 'PUT',
			body: Object.assign(query, args),
			files
		};
		const res = httpMocks.createResponse({ locals: { resource: {} } });
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({
			resource: {
				documentReference: {
					id: args.id,
					type: {
						text: args.type
					},
					status: args.status,
					context: {
						practiceSetting: {
							text: args.specialty
						}
					},
					subject: {
						reference: `Patient/${args.subject}`
					}
				}
			}
		});
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should return FHIR resource and create own res.locals.resource object', () => {
		const middleware = fhirDocumentReferenceMiddleware();

		const query = {};
		const req = {
			method: 'PUT',
			body: Object.assign(query, args),
			files
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({
			resource: {
				documentReference: {
					id: args.id,
					type: {
						text: args.type
					},
					status: args.status,
					context: {
						practiceSetting: {
							text: args.specialty
						}
					},
					subject: {
						reference: `Patient/${args.subject}`
					}
				}
			}
		});
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test('Should return FHIR resource if id argument not present in body', () => {
		const middleware = fhirDocumentReferenceMiddleware();

		const req = {
			method: 'PUT',
			files
		};
		const res = httpMocks.createResponse({ locals: { resource: {} } });
		const next = jest.fn();

		middleware(req, res, next);

		expect(res.locals).toMatchObject({
			resource: {
				documentReference: {
					id: expect.any(String)
				}
			}
		});
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});
});

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
		expect(next.mock.calls[0][0]).toBe('File missing from request');
		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should return FHIR resource if req.resource already present', () => {
		const middleware = fhirDocumentReferenceMiddleware();

		const query = {};
		const req = {
			method: 'PUT',
			body: Object.assign(query, args),
			files,
			resource: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);
		expect(typeof req.resource).toBe('object');
		expect(typeof req.resource.documentReference).not.toBe('undefined');
		expect(req.resource.documentReference.id).toBe(args.id);
		expect(req.resource.documentReference.type.text).toBe(args.type);
		expect(req.resource.documentReference.status).toBe(args.status);
		expect(
			req.resource.documentReference.context.practiceSetting.text
		).toBe(args.specialty);
		expect(req.resource.documentReference.subject.reference).toBe(
			`Patient/${args.subject}`
		);
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should return FHIR resource and create own req.resource object', () => {
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
		expect(typeof req.resource).toBe('object');
		expect(typeof req.resource.documentReference).not.toBe('undefined');
		expect(req.resource.documentReference.id).toBe(args.id);
		expect(req.resource.documentReference.type.text).toBe(args.type);
		expect(req.resource.documentReference.status).toBe(args.status);
		expect(
			req.resource.documentReference.context.practiceSetting.text
		).toBe(args.specialty);
		expect(req.resource.documentReference.subject.reference).toBe(
			`Patient/${args.subject}`
		);
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should return FHIR resource if id argument not present in body', () => {
		const middleware = fhirDocumentReferenceMiddleware();

		const req = {
			method: 'PUT',
			files,
			resource: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);
		expect(typeof req.resource).toBe('object');
		expect(typeof req.resource.documentReference).not.toBe('undefined');
		expect(typeof req.resource.documentReference.id).toBe('string');
		expect(res.statusCode).toBe(200);
		expect(next).toHaveBeenCalledTimes(1);
	});
});

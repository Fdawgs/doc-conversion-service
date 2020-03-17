const fhirDocumentReferenceMiddleware = require("./fhir-documentreference-resource.middleware");
// const httpMocks = require('node-mocks-http');

describe('FHIR DocumentReference resource middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = fhirDocumentReferenceMiddleware();
		expect(typeof middleware).toBe('function');
	});
});

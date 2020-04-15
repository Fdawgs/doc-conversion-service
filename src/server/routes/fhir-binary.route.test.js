let request = require('supertest');
const { helmetConfig, serverConfig } = require('../../config');
const Server = require('../server');

request = request('http://localhost:3000');
const route = '/api/converter/fhir/binary';

describe('FHIR Binary resource route', () => {
	let server;

	beforeEach(() => {
		server = new Server(serverConfig)
			.configureHelmet(helmetConfig)
			.configurePassport()
			.configureMiddleware()
			.configureRoutes()
			.configureErrorHandling()
			.listen();
	});

	afterEach(async () => {
		await server.shutdown();
	});

	test('Should return 400 error code if file missing', () => {
		return request
			.post(route)
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.text).toBe('File missing from request');
			});
    });
    test('Should return converted document', () => {
		return request
			.post(route)
			.set('Authorization', 'Bearer Jimmini')
            .set('Accept', '*/*')
            .attach('document', './test_files/pdf_1.3_NHS_Constitution.pdf')
			.then((res) => {
                const responseResource = JSON.parse(res.text);

                expect(res.status).toBe(200);
                expect(responseResource.resourceType).toBe('Binary');
                expect(responseResource.contentType).toBe('application/pdf');
			});        
    });

    test('Should return converted document with id value set', () => {
		return request
			.put(route)
			.set('Authorization', 'Bearer Jimmini')
            .set('Accept', '*/*')
            .field('id', '12')
            .attach('document', './test_files/pdf_1.3_NHS_Constitution.pdf')
			.then((res) => {
                const responseResource = JSON.parse(res.text);

                expect(res.status).toBe(200);
                expect(responseResource.resourceType).toBe('Binary');
                expect(responseResource.id).toBe(12);
                expect(responseResource.contentType).toBe('application/pdf');
			});        
    })
});

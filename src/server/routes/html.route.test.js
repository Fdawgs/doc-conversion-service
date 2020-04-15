const isHtml = require('is-html');
const fs = require('fs');
let request = require('supertest');
const { helmetConfig, serverConfig } = require('../../config');
const Server = require('../server');

request = request('http://localhost:3000');

describe('HTML conversion route', () => {
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
			.post('/api/converter/html')
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.then((res) => {
				expect(res.status).toBe(400);
				expect(res.text).toBe('Failed to convert PDF to HTML');
			});
    });
    test('Should return converted document', () => {
		return request
			.post('/api/converter/html')
			.set('Authorization', 'Bearer Jimmini')
            .set('Accept', '*/*')
            .set('Content-Type', 'application/pdf')
            .send(fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf'))
			.then((res) => {
                expect(res.status).toBe(200);
				expect(isHtml(res.text)).toBe(true);
			});        
    })
});

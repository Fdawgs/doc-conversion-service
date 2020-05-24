const request = require('superagent');
const { helmetConfig, serverConfig } = require('../../config');
const Server = require('../server');

const route = `http://0.0.0.0:${serverConfig.port}/api/converter/fhir/documentreference`;

describe('FHIR DocumentReference resource route', () => {
	let server;

	beforeAll(() => {
		server = new Server(serverConfig)
			.configureHelmet(helmetConfig)
			.configurePassport()
			.configureMiddleware()
			.configureRoutes()
			.configureErrorHandling()
			.listen();
	});

	afterAll(() => {
		server.shutdown();
	});

	test('Should return 400 error code if file missing', async () => {
		await request
			.post(route)
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.catch((err) => {
				expect(err.status).toBe(400);
				expect(err.response.error.text).toMatch(
					'File missing from request'
				);
			});
	});

	test('Should return converted document', async () => {
		const res = await request
			.post(route)
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.field('status', 'test')
			.field('type', 'test')
			.attach('document', './test_files/pdf_1.3_NHS_Constitution.pdf');

		expect(res.status).toBe(200);
		expect(JSON.parse(res.text).resourceType).toBe('DocumentReference');
		expect(JSON.parse(res.text).content[0].attachment.contentType).toBe(
			'application/pdf'
		);
	});

	test('Should return converted document with id value set', async () => {
		const res = await request
			.put(route)
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.field('id', 12)
			.field('status', 'test')
			.field('type', 'test')
			.attach('document', './test_files/pdf_1.3_NHS_Constitution.pdf');

		expect(res.status).toBe(200);
		expect(JSON.parse(res.text).resourceType).toBe('DocumentReference');
		expect(JSON.parse(res.text).id).toBe(12);
		expect(JSON.parse(res.text).content[0].attachment.contentType).toBe(
			'application/pdf'
		);
	});
});

const faker = require('faker');
const request = require('superagent');
const { helmetConfig, serverConfig } = require('../../config');
const Server = require('../server');

const route = `http://0.0.0.0:${serverConfig.port}/api/converter/fhir/binary`;

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

	afterEach(() => {
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
			.attach('document', './test_files/pdf_1.3_NHS_Constitution.pdf');

		expect(res.status).toBe(200);
		expect(JSON.parse(res.text).resourceType).toBe('Binary');
		expect(JSON.parse(res.text).contentType).toBe('application/pdf');
	});

	test('Should return converted document with id value set', async () => {
		const randomUuid = faker.random.uuid();
		const res = await request
			.put(route)
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.field('id', randomUuid)
			.attach('document', './test_files/pdf_1.3_NHS_Constitution.pdf');

		expect(res.status).toBe(200);
		expect(JSON.parse(res.text).resourceType).toBe('Binary');
		expect(JSON.parse(res.text).id).toBe(randomUuid);
		expect(JSON.parse(res.text).contentType).toBe('application/pdf');
	});
});

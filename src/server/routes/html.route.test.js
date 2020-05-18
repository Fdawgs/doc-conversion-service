const isHtml = require('is-html');
const fs = require('fs');
const request = require('superagent');
const { helmetConfig, serverConfig } = require('../../config');
const Server = require('../server');

const route = `http://0.0.0.0:${serverConfig.port}/api/converter/html`;

describe('HTML conversion route', () => {
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
					'Failed to convert PDF to HTML'
				);
			});
	});

	test('Should return converted document', async () => {
		const res = await request
			.post(route)
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.set('Content-Type', 'application/pdf')
			.send(fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf'));

		expect(res.status).toBe(200);
		expect(isHtml(res.text)).toBe(true);
	});
});

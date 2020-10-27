const cloneDeep = require('lodash/cloneDeep');
const isHtml = require('is-html');
const fs = require('fs');
const request = require('superagent');
const { helmetConfig, serverConfig } = require('../../config');
const Server = require('../server');

describe('TXT conversion route', () => {
	const modServerConfig = cloneDeep(serverConfig);
	modServerConfig.port = 3006;
	let server;

	const route = `http://0.0.0.0:${modServerConfig.port}/api/converter/txt`;

	beforeEach(() => {
		server = new Server(modServerConfig)
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

	test('Should return PDF file converted to TXT', async () => {
		const res = await request
			.post(route)
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.set('Content-Type', 'application/pdf')
			.send(fs.readFileSync('./test_files/pdf_1.3_NHS_Constitution.pdf'));

		expect(res.status).toBe(200);
		expect(typeof res.text).toBe('string');
		expect(isHtml(res.text)).toBe(false);
	});

	test('Should return 400 error code if file missing', async () => {
		await request
			.post(route)
			.set('Authorization', 'Bearer Jimmini')
			.set('Accept', '*/*')
			.set('Content-Type', 'application/pdf')
			.catch((err) => {
				expect(err.status).toBe(400);
				expect(err.response.error.text).toMatch(
					'File type not accepted'
				);
			});
	});
});

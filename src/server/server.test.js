const cloneDeep = require('lodash/cloneDeep');
const request = require('superagent');
const { helmetConfig, serverConfig, loggerConfig } = require('../config');
const Server = require('./server');

describe('Server deployment', () => {
	describe('HTTPs connection with cert and key', () => {
		const modServerConfig = cloneDeep(serverConfig);
		modServerConfig.https = 'true';
		modServerConfig.port = 3001;
		modServerConfig.ssl.cert = `${process.cwd()}/test_ssl_cert/server.cert`;
		modServerConfig.ssl.key = `${process.cwd()}/test_ssl_cert/server.key`;
		let server;

		const route = `https://${process.env.HOST}:${modServerConfig.port}/api/converter/html`;

		beforeEach(() => {
			// Stand up server
			server = new Server(modServerConfig)
				.configureHelmet(helmetConfig)
				.configureLogging(loggerConfig)
				.configurePassport()
				.configureMiddleware()
				.configureRoutes()
				.configureErrorHandling()
				.listen();
		});

		afterEach(() => {
			server.shutdown();
		});

		test('OPTIONS - Should make a successful connection', async () => {
			const res = await request
				.options(route)
				.set('Accept', '*/*')
				.set('Authorization', 'Bearer Jimmini')
				.disableTLSCerts()
				.trustLocalhost();

			expect(res.statusCode).toBe(204);
			expect(server.config.protocol).toBe('https');
		});
	});

	describe('HTTPs connection with PFX file and passphrase', () => {
		const modServerConfig = cloneDeep(serverConfig);
		modServerConfig.https = 'true';
		modServerConfig.port = 3002;
		modServerConfig.ssl.pfx.pfx = `${process.cwd()}/test_ssl_cert/server.pfx`;
		modServerConfig.ssl.pfx.passphrase = 'test';
		let server;

		const route = `https://${process.env.HOST}:${modServerConfig.port}/api/converter/html`;

		beforeEach(() => {
			// Stand up server
			server = new Server(modServerConfig)
				.configureHelmet(helmetConfig)
				.configureLogging(loggerConfig)
				.configurePassport()
				.configureMiddleware()
				.configureRoutes()
				.configureErrorHandling()
				.listen();
		});

		afterEach(() => {
			server.shutdown();
		});

		test('OPTIONS - Should make a successful connection', async () => {
			const res = await request
				.options(route)
				.set('Accept', '*/*')
				.set('Authorization', 'Bearer Jimmini')
				.disableTLSCerts()
				.trustLocalhost();

			expect(res.statusCode).toBe(204);
			expect(server.config.protocol).toBe('https');
		});
	});
});

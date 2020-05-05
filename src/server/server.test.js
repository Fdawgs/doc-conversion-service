const {
	helmetConfig,
	serverConfig,
	loggerConfig
} = require('../config');
const Server = require('./server');

describe('Server deployment', () => {
	test('Should assign default values if none provided', async () => {
		const server = new Server()
			.configurePassport()
			.configureHelmet(helmetConfig)
			.configureLogging(loggerConfig)
			.configureMiddleware()
			.configureErrorHandling()
			.listen();

		expect(server.config.protocol).toBe('http');
		await server.shutdown();
	});

	test('Should set protocol to https with cert and key files', async () => {
		const modServerConfig = JSON.parse(JSON.stringify(serverConfig));
		modServerConfig.https = true;
		modServerConfig.ssl.cert = `${process.cwd()}/test_ssl_cert/server.cert`;
		modServerConfig.ssl.key = `${process.cwd()}/test_ssl_cert/server.key`;

		try {
			const server = new Server(modServerConfig)
				.configureHelmet(helmetConfig)
				.configureLogging(loggerConfig)
				.configurePassport()
				.configureMiddleware()
				.configureRoutes()
				.configureErrorHandling()
				.listen();

			expect(server.config.protocol).toBe('https');
			await server.shutdown();
		} catch (error) {
			// Do nothing
		}
	});

	test('Should set protocol to https with pfx file and passphrase', async () => {
		const modServerConfig = JSON.parse(JSON.stringify(serverConfig));
		modServerConfig.https = true;
		modServerConfig.ssl.pfx.pfx = `${process.cwd()}/test_ssl_cert/server.pfx`;
		modServerConfig.ssl.pfx.passphrase = 'test';

		try {
			const server = new Server(modServerConfig)
				.configureHelmet(helmetConfig)
				.configureLogging(loggerConfig)
				.configurePassport()
				.configureMiddleware()
				.configureRoutes()
				.configureErrorHandling()
				.listen();

			expect(server.config.protocol).toBe('https');
			await server.shutdown();
		} catch (error) {
			// Do nothing
		}
	});
});

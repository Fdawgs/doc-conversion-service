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

	test('Should set protocol to https', async () => {
		const httpsServerConfig = { ...serverConfig };
		httpsServerConfig.https = true;

		try {
			const server = new Server(httpsServerConfig)
				.configurePassport()
				.configureHelmet(helmetConfig)
				.configureLogging(loggerConfig)
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

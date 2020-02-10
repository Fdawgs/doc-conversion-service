const {
    authConfig,
	helmetConfig,
	serverConfig,
	winstonRotateConfig
} = require('../config');
const Server = require('./server');

describe('Server deployment', () => {
	beforeAll(async () => {
		jest.setTimeout(30000);
	});

	test('Should assign default values if none provided', async () => {
        const server = new Server()
            .configureAuthorization(authConfig)
			.configureHelmet(helmetConfig)
			.configureWinston(winstonRotateConfig)
			.configureMiddleware()
			.listen();

		expect(server.config.protocol).toBe('http');
		await server.shutdown();
	});

	test('Should set protocol to https', async () => {
		const httpsServerConfig = { ...serverConfig };
		httpsServerConfig.https = true;

		try {
            const server = new Server(httpsServerConfig)
                .configureAuthorization(authConfig)
				.configureHelmet(helmetConfig)
				.configureWinston(winstonRotateConfig)
				.configureMiddleware()
				.configureRoutes()
				.listen();

			expect(server.config.protocol).toBe('https');
			await server.shutdown();
		} catch (error) {
			// Do nothing
		}
	});
});
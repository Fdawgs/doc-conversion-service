const cloneDeep = require('lodash/cloneDeep');
const { helmetConfig, serverConfig, loggerConfig } = require('../config');
const Server = require('./server');

describe('Server deployment', () => {
	test('Should set protocol to https with cert and key files', () => {
		const modServerConfig = cloneDeep(serverConfig);
		modServerConfig.https = true;
		modServerConfig.port = 3001;
		modServerConfig.ssl.cert = `${process.cwd()}/test_ssl_cert/server.cert`;
		modServerConfig.ssl.key = `${process.cwd()}/test_ssl_cert/server.key`;

		const server = new Server(modServerConfig)
			.configureHelmet(helmetConfig)
			.configureLogging(loggerConfig)
			.configurePassport()
			.configureMiddleware()
			.configureRoutes()
			.configureErrorHandling()
			.listen();

		expect(server.config.protocol).toBe('https');
		server.shutdown();
	});

	test('Should set protocol to https with pfx file and passphrase', () => {
		const modServerConfig = cloneDeep(serverConfig);
		modServerConfig.https = true;
		modServerConfig.port = 3002;
		modServerConfig.ssl.pfx.pfx = `${process.cwd()}/test_ssl_cert/server.pfx`;
		modServerConfig.ssl.pfx.passphrase = 'test';

		const server = new Server(modServerConfig)
			.configureHelmet(helmetConfig)
			.configureLogging(loggerConfig)
			.configurePassport()
			.configureMiddleware()
			.configureRoutes()
			.configureErrorHandling()
			.listen();

		expect(server.config.protocol).toBe('https');
		server.shutdown();
	});
});

const { helmetConfig, serverConfig, winstonRotateConfig } = require('./config');
const Server = require('./server/server');

new Server(serverConfig)
	.configureHelmet(helmetConfig)
	.configureWinston(winstonRotateConfig)
	.configurePassport()
	.configureMiddleware()
	.configureRoutes()
	.listen();

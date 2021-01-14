const { helmetConfig, serverConfig, loggerConfig } = require("./config");
const Server = require("./server/server");

new Server(serverConfig)
	.configureHelmet(helmetConfig)
	.configureLogging(loggerConfig)
	.configurePassport()
	.configureMiddleware()
	.configureRoutes()
	.configureErrorHandling()
	.listen();

const compression = require('compression');
const express = require('express');
const expressWinston = require('express-winston');
const fs = require('fs');
const helmet = require('helmet');
const http = require('http');
const https = require('https');
const passport = require('passport');
const path = require('path');
const { Strategy } = require('passport-http-bearer');
const winston = require('winston');
const WinstonRotate = require('winston-daily-rotate-file');

// Import utils
const bearerTokenAuth = require('./utils/bearer-token-auth.utils');
const errorHandler = require('./utils/error-handler.utils');

// Import routes
const fhirBinaryRoute = require('./routes/fhir-binary.route');
const fhirDocumentReferenceRoute = require('./routes/fhir-binary.route');
const htmlRoute = require('./routes/html.route');

class Server {
	/**
	 * @param {Object} config - Server configuration values.
	 */
	constructor(config = {}) {
		this.config = config;
		// Setup our express instance
		this.app = express();

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Sets up error handling for server.
	 * @returns {this} self
	 */
	configureErrorHandling() {
		this.app.use(errorHandler());

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Sets middleware options for server.
	 * @returns {this} self
	 */
	configureMiddleware() {
		// Add compression
		this.app.use(compression({ level: 9 }));

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Sets up Passport authentication middleware for server.
	 * @returns {this} self
	 */
	configurePassport() {
		passport.use(
			new Strategy((token, callback) => {
				bearerTokenAuth(token, callback, this.config.auth.apiKeys);
			})
		);

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Sets Helmet options for server.
	 * @param {Object} helmetConfig - Helmet configuration values.
	 * @returns {this} self
	 */
	configureHelmet(helmetConfig) {
		// Use Helmet to set response headers
		this.app.use(helmet(helmetConfig));

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Enable routes for server.
	 */
	configureRoutes() {
		this.app.use(
			'/api/docs',
			express.static(path.join(__dirname, '../../docs'))
		);

		this.app.use('/api/converter/html', htmlRoute(this.config.routes.html));
		this.app.use(
			'/api/converter/fhir/binary',
			fhirBinaryRoute(this.config.routes['fhir/binary'])
		);
		this.app.use(
			'/api/converter',
			fhirDocumentReferenceRoute(
				this.config.routes['fhir/documentreference']
			)
		);

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Sets Winston Daily Rotate options for server.
	 * Useful as the Mirth logs will only show the requests coming from
	 * localhost.
	 * @param {Object} winstonRotateConfig - Winston Daily Rotate configuration values.
	 * @returns {this} self
	 */
	configureWinston(winstonRotateConfig) {
		const transport = new WinstonRotate(winstonRotateConfig);

		this.app.use(
			expressWinston.logger({
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.json()
				),
				requestWhitelist: [
					'url',
					'headers',
					'method',
					'httpVersion',
					'originalUrl',
					'query',
					'ip',
					'_startTime'
				],
				transports: [transport]
			})
		);

		// Return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Start the server.
	 * @returns {this} self
	 */
	listen() {
		const server = this.config;
		// Update the express app to be an instance of createServer
		if (server.https === true) {
			const options = {};
			// Attempt to use PFX file if present
			if (server.ssl.pfx.pfx) {
				options.pfx = fs.readFileSync(server.ssl.pfx.pfx);
				options.passphrase = server.ssl.pfx.passphrase;
			} else {
				options.cert = fs.readFileSync(server.ssl.cert);
				options.key = fs.readFileSync(server.ssl.key);
			}

			this.app = https.createServer(options, this.app);
			this.config.protocol = 'https';
		} else {
			this.config.protocol = 'http';
			this.app = http.createServer(this.app);
		}

		// Start the app
		this.app.listen(process.env.PORT || server.port);
		console.log(
			`${process.env.npm_package_name} listening for requests at ${
				this.config.protocol
			}://127.0.0.1:${process.env.PORT || server.port}`
		);

		// Return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Shut down server (non-gracefully).
	 * @returns {Promise<this>} self
	 */
	shutdown() {
		return new Promise((resolve) => {
			this.app.close();
			resolve(this);
		});
	}
}

module.exports = Server;

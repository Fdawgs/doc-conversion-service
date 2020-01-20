const bearerToken = require('express-bearer-token');
const compression = require('compression');
const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const https = require('https');
const http = require('http');

// Import middleware
const authHeader = require('./middleware/auth-header.middleware');

// Import routes
const htmlRoute = require('./routes/html.route');
const fhirRoute = require('./routes/fhir.route');

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
	 * @description Sets up bearer and auth middleware.
	 * @param {Object} authConfig - Authentication configuration values.
	 * @returns {this} self
	 */
	configureAuthorization(authConfig) {
		// Retrieve and then check for matching bearer token
		this.app.use(bearerToken());
		this.app.use(authHeader(authConfig.api_keys));

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
	enableRoutes() {
		this.app.use('/api/converter', htmlRoute(this.config.html_parsing));
		this.app.use('/api/converter', fhirRoute(this.config.required_params));

		// return self for chaining
		return this;
	}

	/**
	 * @author Frazer Smith
	 * @description Start the server.
	 * @param {Number} port - Port for server to listen on.
	 * @returns {this} self
	 */
	listen(port) {
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
		this.app.listen(port);
		console.log(
			`${server.name} listening for requests at ${this.config.protocol}://127.0.0.1:${port}`
		);

		// return self for chaining
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

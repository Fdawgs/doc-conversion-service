/**
 * https: if set to true, server will use the ssl object to provide HTTPS.
 */
const serverConfig = {
	https: false,
	port: 3000,
	auth: {
		apiKeys: [
			{
				service: 'Discharge Summaries',
				value: 'Jimmini'
			},
			{
				service: 'Bone Density',
				value: 'Cricket'
			}
		]
	},
	ssl: {
		cert: './ssl_certs/ydhclientcert.cer',
		key: './ssl_certs/ydhclientcert.key',
		pfx: {
			pfx: './ssl_certs/ydhwildcard.pfx'
		}
	},

	routes: {
		'fhir/documentreference': {
			cors: {
				allowedHeaders:
					'Accept, Authorization, Content-Length, Content-Type, Origin',
				methods: ['POST', 'PUT'],
				origin: '*'
			},
			sanitize: {
				body: {
					document: { type: 'binary', mandatory: true },
					status: { type: 'string', mandatory: true },
					type: { type: 'string', mandatory: true },
					id: { type: 'number' },
					specialty: { type: 'string' },
					subject: { type: 'string' }
				}
			}
		},

		'fhir/binary': {
			cors: {
				allowedHeaders:
					'Accept, Authorization, Content-Length, Content-Type, Origin',
				methods: ['POST', 'PUT'],
				origin: '*'
			},
			sanitize: {
				body: {
					document: { type: 'binary', mandatory: true },
					id: { type: 'number' }
				}
			}
		},

		html: {
			cors: {
				allowedHeaders:
					'Accept, Authorization, Content-Length, Content-Type, Origin',
				methods: ['POST'],
				origin: '*'
			},

			/**
			 * Refer to http://api.html-tidy.org/tidy/tidylib_api_5.6.0/tidy_quickref.html for tidy options
			 *
			 * The following options have been turned on:
			 * - bare (remove Microsoft specific HTML and replace &nbsp; with spaces)
			 * - clean (replace legacy HTML tags)
			 * - dropProprietaryAttributes (remove proprietary attributes, such as Microsoft data binding attributes)
			 * - escapeCdata (convert <![CDATA[]]> sections to normal text)
			 * - sortAttributes (sort attributes in element in ascending alphabetic sort)
			 */
			htmltidy: {
				bare: 'yes',
				clean: 'yes',
				dropProprietaryAttributes: 'yes',
				escapeCdata: 'yes',
				sortAttributes: 'alpha'
			},
			poppler: {
				/**
				 * Directory where HTML files and their images are temporarily held
				 * after being generated by Poppler.
				 */
				binPath: '',
				encoding: 'UTF-8'
			},

			sanitize: {
				query: {
					fonts: { type: 'string' },
					removealt: { type: 'boolean' }
				}
			}
		}
	}
};

/**
 * The following headers are turned on by default:
 * - dnsPrefetchControl (Control browser DNS prefetching). https://helmetjs.github.io/docs/dns-prefetch-control
 * - frameguard (prevent clickjacking). https://helmetjs.github.io/docs/frameguard
 * - hidePoweredBy (remove the X-Powered-By header). https://helmetjs.github.io/docs/hide-powered-by
 * - hsts (HTTP strict transport security). https://helmetjs.github.io/docs/hsts
 * - ieNoOpen (sets X-Download-Options for IE8+). https://helmetjs.github.io/docs/ienoopen
 * - noSniff (prevent clients from sniffing MIME type). https://helmetjs.github.io/docs/dont-sniff-mimetype
 * - xssFilter (adds small XSS protections). https://helmetjs.github.io/docs/xss-filter/
 */
const helmetConfig = {
	contentSecurityPolicy: {
		directives: {
			defaultSrc: ["'self'", 'fonts.gstatic.com'],
			scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
			styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com']
		}
	},
	frameguard: {
		action: 'deny'
	},
	hidePoweredBy: true
};

// Refer to option documention here: https://github.com/winstonjs/winston-daily-rotate-file/blob/master/README.md#options
const loggerConfig = {
	auditFile: 'logs/logging-audit.json',
	datePattern: 'YYYY-MM-DD',
	dirname: 'logs',
	extension: '.json',
	filename: 'doc-service-log-%DATE%',
	maxFiles: '14d',
	maxSize: '20m',
	zippedArchive: true
};

module.exports = {
	helmetConfig,
	serverConfig,
	loggerConfig
};

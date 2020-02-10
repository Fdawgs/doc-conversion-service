/**
 * https: if set to true, server will use the ssl object to provide HTTPS.
 */
const serverConfig = {
	https: false,
	port: 8204,
	ssl: {
		cert: './ssl_certs/ydhclientcert.cer',
		key: './ssl_certs/ydhclientcert.key',
		pfx: {
			pfx: './ssl_certs/ydhwildcard.pfx'
		}
	},

	// Object containing all config files for HTML/PDF manipulation binaries
	html_parsing: {
		/**
		 * Refer to http://api.html-tidy.org/tidy/tidylib_api_5.6.0/tidy_quickref.html for tidy options
		 *
		 * The following options have been turned on:
		 * - bare (remove Microsoft specific HTML and replace &nbsp; with spaces)
		 * - clean (replace legacy HTML tags)
		 * - dropProprietaryAttributes (remove proprietary attributes, such as Microsoft data binding attributes)
		 * - escapeCdata (convert <![CDATA[]]> sections to normal text)
		 * - hideComments ()
		 * - sortAttributes (sort attributes in element in ascending alphabetic sort)
		 */
		htmltidy: {
			bare: 'yes',
			clean: 'yes',
			dropProprietaryAttributes: 'yes',
			escapeCdata: 'yes',
			hideComments: 'yes',
			sortAttributes: 'alpha'
		},
		poppler: {
			/**
			 * Directory where HTML files and their images are temporarily held
			 * after being generated by Poppler.
			 */
			binPath: '',
			encoding: 'UTF-8'
		}
	},

	required_params: {
		'fhir/documentreference': ['status', 'type']
	}
};

// Array of API bearer key values and the service they relate to
const authConfig = {
	api_keys: [
		{
			service: 'Discharge Summaries',
			value: 'Jimmini'
		}
	]
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
			defaultSrc: ["'self'"],
			scriptSrc: ["'self'", "'unsafe-inline'"],
			styleSrc: ["'self'", "'unsafe-inline'"]
		}
	},
	frameguard: {
		action: 'deny'
	},
	hidePoweredBy: true,
	noCache: true
};

// Refer to option documention here: https://github.com/winstonjs/winston-daily-rotate-file/blob/master/README.md#options
const winstonRotateConfig = {
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
	authConfig,
	helmetConfig,
	serverConfig,
	winstonRotateConfig
};

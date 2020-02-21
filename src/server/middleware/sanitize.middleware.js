const sanitize = require('sanitize-html');
const validator = require('validator');
const xss = require('xss');

/**
 * @author Frazer Smith
 * @description Sanitizes value based on type passed.
 * @param {String} value
 * @param {String} type - Expected type of value.
 * @returns {String} parsed value.
 */
function parseValue(value, type) {
	let result;
	switch (type) {
		case 'number':
			result = validator.toFloat(value);
			break;
		case 'boolean':
			result = validator.toBoolean(value);
			break;
		case 'string':
			// Strip any HTML tags, non-word characters, and control characters
			result = validator.stripLow(xss(sanitize(value))).trim();
			break;
		case 'object':
			result = JSON.parse(JSON.stringify(value));
			break;
		case 'json':
			result = JSON.parse(value);
			break;
		default:
			// Pass the value through, unknown types will fail when being validated
			result = value;
			break;
	}
	return result;
}

/**
 * @author Frazer Smith
 * @description Check all mandatory arguments are present then
 * attempt to parse and sanitize all arguments passed if they're valid.
 * @param {Object} args
 * @param {Object} config - Objects containing accepted arguments as properties, and their types as values.
 * @returns {Error|String}
 */
function parseValues(args, config) {
	const values = args;
	const keys = Object.keys(values);
	let message;

	// check mandatory values are present
	const mandatoryArgs = [];
	Object.keys(config).forEach((configKey) => {
		if (config[configKey].mandatory && config[configKey].mandatory === true) {
			mandatoryArgs.push(configKey);
		}
	});

	if (
		mandatoryArgs.every((element) =>
			keys.map((x) => x.toLowerCase()).includes(element.toLowerCase())
		) === false
	) {
		message = `A mandatory parameter is missing from the list: ${mandatoryArgs.join(', ').toString()}`;
		return new Error(message);
	}

	keys.forEach((key) => {
		// Compare arguments to accepted arguments
		if (Object.prototype.hasOwnProperty.call(config, key) && config[key].type) {
			values[key] = parseValue(values[key], config[key].type);
		} else {
			message = `Invalid option provided: ${key}`;
		}
	});
	if (typeof message !== 'undefined') {
		return new Error(message);
	}
	return values;
}

/**
 * @author Frazer Smith
 * @description Check all mandatory values are present and then sanitize
 * and validate query, param and body of requests to protect against
 * cross-site scripting (XSS) and command injection attacks.
 * @param {Object=} config - Sanitization configuration values.
 * @return {Function} Express middleware.
 */
module.exports = function sanitizeMiddleware(config = {}) {
	return (req, res, next) => {
		if (
			req.query &&
			req.method === 'GET' &&
			Object.keys(req.query).length
		) {
			req.query = parseValues(req.query, config);
			if (req.query instanceof Error) {
				return next(req.query.message);
			}
		}
		if (
			req.body &&
			['PUT', 'POST'].includes(req.method) &&
			Object.keys(req.body).length
		) {
			req.body = parseValues(req.body, config);
			if (req.body instanceof Error) {
				return next(req.body.message);
			}
		}
		if (req.params && Object.keys(req.params).length) {
			req.params = parseValues(req.params, config);
			if (req.params instanceof Error) {
				return next(req.params.message);
			}
		}
		return next();
	};
};

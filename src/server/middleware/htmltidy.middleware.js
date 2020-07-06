const isHtml = require('is-html');
const { tidy } = require('htmltidy2');

/**
 * @author Frazer Smith
 * @description Use HTMLTidy2 to parse and tidy HTML passed.
 * @param {string} html - HTML string.
 * @param {string} config - HTMLTidy2 configuration values.
 * @returns {Promise<string>} Promise of parsed HTML string on resolve, or error string on rejection.
 */
function tidyHtml(html, config) {
	return new Promise((resolve) => {
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		tidy(html, config, (err, tidiedHtml) => {
			resolve(tidiedHtml);
		});
	});
}

/**
 * @author Frazer Smith
 * @description Uses HTMLTidy2 to parse and tidy HTML in `req.body`.
 * @param {object=} config - HTMLTidy2 configuration values.
 * @returns {Function} Express middleware.
 */
module.exports = function htmltidyMiddleware(config = {}) {
	return async (req, res, next) => {
		if (typeof req.body === 'string' && isHtml(req.body)) {
			try {
				req.body = await tidyHtml(req.body, config);
				next();
			} catch (err) {
				res.status(400);
				next(err);
			}
		} else {
			res.status(400);
			next(new Error('Invalid HTML passed to htmltidy middleware'));
		}
	};
};

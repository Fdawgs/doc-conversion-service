const { tidy } = require('htmltidy2');

/**
 * @author Frazer Smith
 * @description Uses HTMLTidy2 to parse and tidy HTML in `req.body`.
 * @param {object=} config - HTMLTidy2 configuration values.
 * @returns {Function} Express middleware.
 */
module.exports = function htmltidyMiddleware(config = {}) {
	return async (req, res, next) =>
		new Promise((resolve) => {
			// eslint-disable-next-line promise/prefer-await-to-callbacks
			tidy(req.body, config, (err, tidiedHtml) => {
				req.body = tidiedHtml;
				resolve(next());
			});
		});
};

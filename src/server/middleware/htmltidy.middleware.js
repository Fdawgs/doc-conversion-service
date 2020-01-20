const { tidy } = require('htmltidy2');

/**
 * @author Frazer Smith
 * @description Uses HTMLTidy2 to parse and tidy HTML of passed file.
 * @param {Object} config - HTMLTidy2 configuration values.
 * @return {Function} express middleware.
 */
module.exports = function htmltidyMiddleware(config) {
	return (req, res, next) =>
		new Promise((resolve, reject) => {
			tidy(req.body, config, (err, tidiedHtml) => {
				req.body = tidiedHtml;
				if (err) {
					reject(new Error(err));
				}
				resolve(next());
			});
		});
};

const isHtml = require('is-html');
const { tidy } = require('htmltidy2');
const util = require('util');

const tidyHtml = util.promisify(tidy);

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

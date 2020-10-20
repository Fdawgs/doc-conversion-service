const fixUtf8 = require('fix-utf8');

/**
 * @author Frazer Smith
 * @description Replace most common incorrectly converted Windows-1252
 * to UTF-8 results found in `res.locals.body` with HTML equivalents.
 * Refer to https://www.i18nqa.com/debug/utf8-debug.html for more info.
 * @returns {Function} Express middleware.
 */
module.exports = function fixWin1252ArtifactsMiddleware() {
	return (req, res, next) => {
		const html = fixUtf8(res.locals.body);

		// Create results object for conversion results
		if (typeof res.locals.results === 'undefined') {
			res.locals.results = {};
		}

		res.locals.body = html;
		res.locals.results.windows_1252 = 'Fixed';
		next();
	};
};

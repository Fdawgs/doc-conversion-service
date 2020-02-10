const fixUtf8 = require('fix-utf8');

/**
 * @author Frazer Smith
 * @description Replace most common incorrectly converted Windows-1252
 * to UTF-8 results with HTML equivalents.
 * Refer to https://www.i18nqa.com/debug/utf8-debug.html for more info.
 * @return {Function} express middleware.
 */
module.exports = function fixWin1252ArtifactsMiddleware() {
	return async (req, res, next) => {
		const html = fixUtf8(req.body);

		// Create results object for conversion results
		if (typeof req.results === 'undefined') {
			req.results = {};
		}

		req.body = html;
		req.results.windows_1252 = 'Fixed';
		next();
	};
};

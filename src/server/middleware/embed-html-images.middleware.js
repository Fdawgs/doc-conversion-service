const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');

/**
 * @author Frazer Smith
 * @description Embeds images after encoding with Base64 to allow for
 * images to be transmitted via MESH.
 * @param {String=} tempDirectory - Directory where HTML docs and their images are
 * temporarily held after being generated by Poppler middleware.
 * Defaults to src/server/temp if not set.
 * @param {Boolean=} req.query.removealt - Remove alt attribute from content.
 * Useful for systems where recieved documents are converted to TIFF
 * (i.e. TPP's SystmOne).
 * @return {Function} Express middleware.
 */
module.exports = function embedHtmlImagesMiddleware(tempDirectory) {
	return async (req, res, next) => {
		const tempDir =
			tempDirectory || `${path.resolve(__dirname, '..')}\\temp\\`;
		const dom = new JSDOM(req.body);
		const images = dom.window.document.querySelectorAll('img');

		// Create results object for conversion results
		if (typeof res.locals.results === 'undefined') {
			res.locals.results = {};
		}

		try {
			images.forEach((element) => {
				const imgForm = path.extname(element.src).substring(1);
				const imageAsBase64 = `data:image/${imgForm};base64,${fs.readFileSync(
					tempDir + element.src,
					'base64'
				)}`;
				element.setAttribute('src', imageAsBase64);
				if (req.query && req.query.removealt) {
					element.setAttribute('alt', '');
				}
			});
			if (images.length > 0) {
				res.locals.results.embedded_images = 'Fixed';
			} else {
				res.locals.results.embedded_images = 'Passed';
			}
			req.body = dom.window.document.documentElement.outerHTML;
			next();
		} catch (error) {
			res.status(400);
			next(new Error(error));
		}
	};
};

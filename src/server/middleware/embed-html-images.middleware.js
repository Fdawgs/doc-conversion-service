const fs = require('fs');
const isHtml = require('is-html');
const { JSDOM } = require('jsdom');
const path = require('path');

/**
 * @author Frazer Smith
 * @description Embeds images into HTML in `req.body` after encoding with Base64 to allow for
 * images to be transmitted via MESH.
 *
 * Will remove alt attribute from img tags if optional `removealt` query
 * string param set to `true`.
 * Useful for systems where img tags are stripped from received documents
 * (i.e. TPP's SystmOne).
 * @param {string=} tempDirectory - Directory where HTML docs and their images are
 * temporarily held after being generated by Poppler middleware.
 * Defaults to src/server/temp if not set.
 * @returns {Function} Express middleware.
 */
module.exports = function embedHtmlImagesMiddleware(tempDirectory) {
	return (req, res, next) => {
		if (isHtml(req.body)) {
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
		} else {
			res.status(400);
			next(
				new Error('Invalid HTML passed to embedHtmlImages middleware')
			);
		}
	};
};

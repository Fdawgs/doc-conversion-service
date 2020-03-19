const { Router } = require('express');
const glob = require('glob');
const fs = require('fs');
const passport = require('passport');

// Import middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const sanitize = require('sanitize-middleware');
const embedHtmlImages = require('../middleware/embed-html-images.middleware');
const fixCss = require('../middleware/clean-css.middleware');
const fixWin1252Artifacts = require('../middleware/win1252-artifacts.middleware');
const htmltidy = require('../middleware/htmltidy.middleware');
const poppler = require('../middleware/poppler.middleware');

const router = new Router();

/**
 * @api {post} /api/converter/html POST
 * @apiName PostHtml
 * @apiGroup HTML
 * @apiDescription Convert PDF to HTML.
 *
 * @apiHeader {String} Authorization Bearer token for authorization.
 * @apiHeader {String=application/pdf} Content-Type
 *
 * @apiParam (Query string) {Boolean=true, false} [removealt] Remove the alt attribute from image tags.
 * @apiParam (Query string) {String} [fonts] Define the font(s) of the text in the returned HTML document. Eg:
 * ```
 * font=Arial
 * ```
 * ```
 * font=Arial,Sans Serif
 * ```
 * @apiParam (Request body) {Binary} data Binary content such as text, image, pdf, zip archive, etc.
 *
 * @apiExample {curl} Example usage:
 * curl --request POST \
 *   --url 'http://localhost:8204/api/converter/html?removealt=true&fonts=Arial' \
 *   --header 'authorization: Bearer Jimmini' \
 *   --header 'content-type: application/pdf' \
 *   --data 'JVBERi0xLjMNJeLjz9'
 */

/**
 * @author Frazer Smith
 * @description Handles routing for /html/ path.
 * @param {Object} config
 * @param {Object} config.cors
 * @param {Object=} config.htmltidy - HTMLTidy2 configuration values.
 * @param {Object=} config.poppler - Poppler conversion configuration values.
 * @param {Object=} config.sanitize - Sanitization configuration values.
 * @returns {Router} express router instance.
 */
module.exports = function htmlRoute(config) {
	router.use(
		passport.authenticate('bearer', { session: false }),
		sanitize(config.sanitize),
		cors(config.cors)
	);

	router
		.route('/html')
		.options()
		.post(
			cors(config.cors),
			bodyParser.raw({ type: ['application/pdf'], limit: '20mb' }),
			poppler(config.poppler),
			htmltidy(config.htmltidy),
			fixWin1252Artifacts(),
			embedHtmlImages(),
			fixCss(),
			// Delete temporary files after it has been converted to HTML
			(req, res, next) => {
				const files = glob.GlobSync(
					`${req.doclocation.directory}/${req.doclocation.id}*`
				).found;
				files.forEach((file) => {
					fs.unlink(file, (err) => {
						if (err) {
							throw new Error(err);
						}
					});
				});
				res.send(`<!DOCTYPE html>${req.body}`);
				next();
			}
		);

	return router;
};

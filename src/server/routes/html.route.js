/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/no-undefined-types */
/* eslint-disable jsdoc/valid-types */
const passport = require('passport');
const { Router } = require('express');

// Import middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const sanitize = require('sanitize-middleware');
const embedHtmlImages = require('../middleware/embed-html-images.middleware');
const fixWin1252Artifacts = require('../middleware/win1252-artifacts.middleware');
const pdfToHtml = require('../middleware/pdf-to-html.middleware');
const rtfToHtml = require('../middleware/rtf-to-html.middleware');
const tidyCss = require('../middleware/tidy-css.middleware');
const tidyHtml = require('../middleware/tidy-html.middleware');
const validateFile = require('../middleware/validate-file-type.middleware');

// Import utils
const fileRemover = require('../utils/file-remover.utils');

const acceptedTypes = ['application/pdf', 'application/rtf'];
const router = new Router();

/**
 * @api {options} /api/converter/html HTML - OPTIONS
 * @apiName OptionsHtml
 * @apiGroup HTML
 * @apiDescription Support for preflight CORS requests.
 *
 * @apiHeader {string} Authorization Bearer token for authorization.
 *
 * @apiExample {curl} Example usage:
 * curl --request OPTIONS \
 * 	 --url http://localhost:3000/api/converter/html \
 *   --header 'authorization: Bearer Jimmini'
 *
 * @apiSuccessExample {json} Example Success Response:
 * HTTP/1.1 204 No Content
 * {
 *     "Content-Security-Policy": "default-src 'self' fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com",
 *     "X-Content-Security-Policy": "default-src 'self' fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com",
 *     "X-WebKit-CSP": "default-src 'self' fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com fonts.gstatic.com",
 *     "X-DNS-Prefetch-Control": "off",
 *     "X-Frame-Options": "DENY",
 *     "Strict-Transport-Security": "max-age=15552000; includeSubDomains",
 *     "X-Download-Options": "noopen",
 *     "X-Content-Type-Options": "nosniff",
 *     "X-XSS-Protection": "1; mode=block",
 *     "Access-Control-Allow-Origin": "*",
 *     "Access-Control-Allow-Methods": "PUT",
 *     "Access-Control-Allow-Headers": "Accept, Authorization, Content-Length, Content-Type, Origin",
 *     "Content-Length": "0",
 *     "Date": "Wed, 18 Mar 2020 12:50:32 GMT",
 *     "Connection": "keep-alive"
 * }
 */

/**
 * @api {post} /api/converter/html HTML - POST
 * @apiName PostHtml
 * @apiGroup HTML
 * @apiDescription Convert PDF or RTF to HTML.
 *
 * @apiHeader {string} Authorization Bearer token for authorization.
 * @apiHeader {string=application/pdf, application/rtf} Content-Type
 *
 * @apiParam (Query string) {string} [backgroundColor] Define HTML document background color.
 * @apiParam (Query string) {Boolean=true, false} [exchangePdfLinks] Exchange .pdf links with .html. **PDF files only.**
 * @apiParam (Query string) {Boolean=true, false} [extractHidden] Force hidden text extraction. **PDF files only.**
 * @apiParam (Query string) {number} [firstPageToConvert] First page to print. **PDF files only.**
 * @apiParam (Query string) {string} [fonts] Define the font(s) of the text in the returned HTML document. Eg:
 * ```
 * font=Arial
 * ```
 * ```
 * font=Arial,Sans Serif
 * ```
 * @apiParam (Query string) {Boolean=true, false} [fontFullName] Outputs the font name without any substitutions. **PDF files only.**
 * @apiParam (Query string) {Boolean=true, false} [ignoreImages] Ignore images. **PDF files only.**
 * @apiParam (Query string) {string=JPG, PNG} [imageFormat] Image file format for Splash output (JPG or PNG). **PDF files only.**
 * @apiParam (Query string) {number} [lastPageToConvert] Last page to print. **PDF files only.**
 * @apiParam (Query string) {Boolean=true, false} [noDrm] Override document DRM settings. **PDF files only.**
 * @apiParam (Query string) {Boolean=true, false} [noMergeParagraph] Do not merge paragraphs. **PDF files only.**
 * @apiParam (Query string) {string} [outputEncoding] Sets the encoding to use for text output.
 * This defaults to `UTF-8`. **PDF files only.**
 * @apiParam (Query string) {string} [ownerPassword] Owner password (for encrypted files). **PDF files only.**
 * @apiParam (Query string) {Boolean=true, false} [removeAlt] Remove the alt attribute from image tags. **PDF files only.**
 * @apiParam (Query string) {string} [userPassword] User password (for encrypted files). **PDF files only.**
 * @apiParam (Query string) {number} [wordBreakThreshold] Adjust the word break threshold percent.
 * Default is 10. Word break occurs when distance between two adjacent characters is greater
 * than this percent of character height. **PDF files only.**
 * @apiParam (Query string) {number} [zoom] Zoom the PDF document (default 1.5). **PDF files only.**
 *
 * @apiParam (Request body) {Binary} data Binary content such as text, image, pdf, zip archive, etc.
 *
 * @apiExample {curl} Example usage:
 * curl --request POST \
 *   --url 'http://localhost:3000/api/converter/html?removeAlt=true&fonts=Arial' \
 *   --header 'authorization: Bearer Jimmini' \
 *   --header 'content-type: application/pdf' \
 *   --data 'JVBERi0xLjMNJeLjz9'
 */

/**
 * @author Frazer Smith
 * @description Handles routing to convert a request with a PDF or RTF file as its body into HTML.
 * @param {object} config - Object containing route config objects.
 * @param {object} config.cors - CORS configuration values.
 * @param {object=} config.htmltidy - HTMLTidy2 configuration values.
 * @param {object=} config.poppler - Poppler conversion configuration values.
 * @param {object=} config.sanitize - Sanitization configuration values.
 * @returns {Router} Express router instance.
 */
module.exports = function htmlRoute(config) {
	router.use(
		passport.authenticate('bearer', { session: false }),
		sanitize(config.sanitize),
		cors(config.cors)
	);

	router.route('/').post(
		bodyParser.raw({
			type: acceptedTypes,
			limit: '20mb'
		}),
		validateFile(acceptedTypes),
		rtfToHtml(config.unrtf),
		pdfToHtml(config.poppler),
		tidyHtml(config.htmltidy),
		fixWin1252Artifacts(),
		embedHtmlImages(config.poppler.tempDirectory),
		tidyCss(),
		(req, res) => {
			fileRemover(
				`${res.locals.doclocation.directory}/${res.locals.doclocation.id}*`
			);

			res.send(`<!DOCTYPE html>${res.locals.body}`);
		}
	);

	return router;
};

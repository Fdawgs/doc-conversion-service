/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/no-undefined-types */
/* eslint-disable jsdoc/valid-types */
const passport = require('passport');
const { Router } = require('express');

// Import middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const sanitize = require('sanitize-middleware');
const pdfToTxt = require('../middleware/pdf-to-txt.middleware');

// Import utils
const fileRemover = require('../utils/file-remover.utils');

const router = new Router();

/**
 * @api {options} /api/converter/txt TXT - OPTIONS
 * @apiName OptionsTxt
 * @apiGroup TXT
 * @apiDescription Support for preflight CORS requests.
 *
 * @apiHeader {string} Authorization Bearer token for authorization.
 *
 * @apiExample {curl} Example usage:
 * curl --request OPTIONS \
 * 	 --url http://localhost:3000/api/converter/txt \
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
 * @api {post} /api/converter/txt TXT - POST
 * @apiName PostTxt
 * @apiGroup TXT
 * @apiDescription Convert PDF to TXT.
 *
 * @apiHeader {string} Authorization Bearer token for authorization.
 * @apiHeader {string=application/pdf} Content-Type
 *
 * @apiParam (Query string) {Boolean=true, false} [boundingBoxXhtml] Generate an XHTML file containing bounding
 * box information for each word in the file.
 * @apiParam (Query string) {Boolean=true, false} [boundingBoxXhtmlLayout] Generate an XHTML file containing
 * bounding box information for each block, line, and word in the file.
 * @apiParam (Query string) {number} [cropHeight] Specifies the height of crop area in pixels
 * (image output) or points (vector output).
 * @apiParam (Query string) {number} [cropWidth] Specifies the width of crop area in pixels
 * (image output) or points (vector output).
 * @apiParam (Query string) {number} [cropXAxis] Specifies the x-coordinate of the crop area top left
 * corner in pixels (image output) or points (vector output).
 * @apiParam (Query string) {number} [cropYAxis] Specifies the y-coordinate of the crop area top left
 * corner in pixels (image output) or points (vector output).
 * @apiParam (Query string) {string=unix, dos, mac} [eolConvention] Sets the end-of-line convention to use for
 * text output: unix; dos; mac.
 * @apiParam (Query string) {number} [firstPageToConvert] Specifies the first page to convert.
 * @apiParam (Query string) {number} [fixedWidthLayout] Assume fixed-pitch (or tabular) text, with the
 * specified character width (in points). This forces physical layout mode.
 * @apiParam (Query string) {Boolean=true, false} [generateHtmlMetaFile] Generate simple HTML file, including the
 * meta information. This simply wraps the text in `<pre>` and `</pre>` and prepends the meta headers.
 * @apiParam (Query string) {number} [lastPageToConvert] Specifies the last page to convert.
 * @apiParam (Query string) {Boolean=true, false} [listEncodingOptions] List the available encodings.
 * @apiParam (Query string) {Boolean=true, false} [maintainLayout] Maintain (as best as possible) the original physical
 * layout of the text. The default is to undo physical layout (columns, hyphenation, etc.) and
 * output the text in reading order.
 * @apiParam (Query string) {Boolean=true, false} [noDiagonalText] Discard diagonal text.
 * @apiParam (Query string) {Boolean=true, false} [noPageBreaks] Don't insert page breaks (form feed characters)
 * between pages.
 * @apiParam (Query string) {string} [outputEncoding] Sets the encoding to use for text output.
 * This defaults to "UTF-8".
 * @apiParam (Query string) {string} [ownerPassword] Owner password (for encrypted files).
 * @apiParam (Query string) {Boolean=true, false} [rawLayout] Keep the text in content stream order. This is a
 * hack which often "undoes" column formatting, etc. Use of raw mode is no longer recommended.
 * @apiParam (Query string) {string} [userPassword] User password (for encrypted files).
 * @apiParam (Query string) (Request body) {Binary} data Binary content such as text, image, pdf, zip archive, etc.
 *
 * @apiExample {curl} Example usage:
 * curl --request POST \
 *   --url 'http://localhost:3000/api/converter/txt?noPageBreaks=true&lastPageToConvert=5' \
 *   --header 'authorization: Bearer Jimmini' \
 *   --header 'content-type: application/pdf' \
 *   --data 'JVBERi0xLjMNJeLjz9'
 */

/**
 * @author Frazer Smith
 * @description Handles routing to convert a request with a PDF file as its body into TXT.
 * @param {object} config - Object containing route config objects.
 * @param {object} config.cors - CORS configuration values.
 * @param {object=} config.poppler - Poppler conversion configuration values.
 * @param {object=} config.sanitize - Sanitization configuration values.
 * @returns {Router} Express router instance.
 */
module.exports = function txtRoute(config) {
	router.use(
		passport.authenticate('bearer', { session: false }),
		sanitize(config.sanitize),
		cors(config.cors)
	);

	router.route('/').post(
		bodyParser.raw({
			type: ['application/pdf'],
			limit: '20mb'
		}),
		pdfToTxt(config.poppler),
		(req, res) => {
			fileRemover(
				`${res.locals.doclocation.directory}/${res.locals.doclocation.id}*`
			);

			res.send(res.locals.body);
		}
	);

	return router;
};

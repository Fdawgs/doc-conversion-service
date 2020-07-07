/* eslint-disable jsdoc/check-tag-names */
const { Router } = require('express');
const passport = require('passport');

// Import middleware
const bodyParser = require('body-parser');
const cors = require('cors');
const sanitize = require('sanitize-middleware');
const embedHtmlImages = require('../middleware/embed-html-images.middleware');
const cleanCss = require('../middleware/clean-css.middleware');
const fixWin1252Artifacts = require('../middleware/win1252-artifacts.middleware');
const htmltidy = require('../middleware/htmltidy.middleware');
const poppler = require('../middleware/poppler.middleware');
const rtf = require('../middleware/rtf.middleware');

// Import utils
const fileRemover = require('../utils/file-remover.utils');

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
 * 	 --url https://ydh-watchdog.ydh.nhs.uk:8204/api/converter/html \
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
 * @apiParam (Query string) {Boolean=true, false} [removealt] Remove the alt attribute from image tags.
 * @apiParam (Query string) {string} [fonts] Define the font(s) of the text in the returned HTML document. Eg:
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
 * @description Handles routing to convert a request with a PDF file as its body into HTML.
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
			type: ['application/pdf', 'application/rtf'],
			limit: '20mb'
		}),
		rtf(),
		poppler(config.poppler),
		htmltidy(config.htmltidy),
		fixWin1252Artifacts(),
		embedHtmlImages(config.poppler.tempDirectory),
		cleanCss(),
		(req, res) => {
			if (req.headers['content-type'] === 'application/pdf') {
				fileRemover(
					`${res.locals.doclocation.directory}/${res.locals.doclocation.id}*`
				);
			}

			res.send(`<!DOCTYPE html>${req.body}`);
		}
	);

	return router;
};

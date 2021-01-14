/* eslint-disable jsdoc/check-tag-names */
/* eslint-disable jsdoc/no-undefined-types */
/* eslint-disable jsdoc/valid-types */
const passport = require("passport");
const { Router } = require("express");

// Import middleware
const cors = require("cors");
const multer = require("multer");
const sanitize = require("sanitize-middleware");
const fhirBinary = require("../middleware/fhir-binary-resource.middleware");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router();

/**
 * @api {options} /api/converter/fhir/binary Binary - OPTIONS
 * @apiName OptionsBinary
 * @apiGroup FHIR
 * @apiDescription Support for preflight CORS requests.
 *
 * @apiHeader {string} Authorization Bearer token for authorization.
 *
 * @apiExample {curl} Example usage:
 * curl --request OPTIONS \
 * 	 --url http://localhost:3000/api/converter/fhir/binary \
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
 *     "Access-Control-Allow-Methods": "POST,PUT",
 *     "Access-Control-Allow-Headers": "Accept, Authorization, Content-Length, Content-Type, Origin",
 *     "Content-Length": "0",
 *     "Date": "Wed, 18 Mar 2020 12:50:32 GMT",
 *     "Connection": "keep-alive"
 * }
 */

/**
 * @api {post} /api/converter/fhir/binary Binary - POST
 * @apiName PostBinary
 * @apiGroup FHIR
 * @apiDescription Convert any file passed to FHIR STU3 Binary Resource.
 *
 * @apiHeader {string} Authorization Bearer token for authorization.
 * @apiHeader {string=multipart/form-data} Content-Type
 *
 * @apiParam (Request body) {Binary} document Binary content such as text, image, pdf, zip archive, etc.
 *
 * @apiExample {curl} Example usage:
 * curl --request POST \
 *   --url http://localhost:3000/api/converter/fhir/binary \
 * 	 --header 'authorization: Bearer Jimmini' \
 *   --header 'content-type: multipart/form-data' \
 *   --form document=
 * @apiSuccessExample {json} Example Success Response:
 * HTTP/1.1 200 OK
 * 	{
 * 		"resourceType": "Binary",
 * 		"id": "cb9723d0-70ee-4427-8804-66a2d19eebfe",
 * 		"language": "English (Great Britain)",
 *		"contentType": "application/pdf",
 * 		"content": "base64encodedstring"
 * 	}
 */

/**
 * @api {put} /api/converter/fhir/binary Binary - PUT
 * @apiName PutBinary
 * @apiGroup FHIR
 * @apiDescription Convert any file passed to FHIR STU3 Binary Resource.
 *
 * @apiHeader {string} Authorization Bearer token for authorization.
 * @apiHeader {string=multipart/form-data} Content-Type
 *
 * @apiParam (Request body) {string} id Logical id of the artifact.
 * @apiParam (Request body) {Binary} document Binary content such as text, image, pdf, zip archive, etc.
 *
 * @apiExample {curl} Example usage:
 * curl --request PUT \
 *   --url http://localhost:3000/api/converter/fhir/binary \
 *   --header 'authorization: Bearer Jimmini' \
 *   --header 'content-type: multipart/form-data' \
 *   --form document= \
 *   --form id=12
 * @apiSuccessExample {json} Example Success Response:
 * HTTP/1.1 200 OK
 * 	{
 * 		"resourceType": "Binary",
 * 		"id": "12",
 * 		"language": "English (Great Britain)",
 *		"contentType": "application/pdf",
 * 		"content": "base64encodedstring"
 * 	}
 */

/**
 * @author Frazer Smith
 * @description Handles routing to convert a request to a FHIR Binary resource.
 * @param {object} config - Object containing route config objects.
 * @param {object} config.cors - CORS configuration values.
 * @param {object=} config.sanitize - Sanitization configuration values.
 * @returns {Router} Express router instance.
 */
module.exports = function fhirRoute(config) {
	router.use(
		passport.authenticate("bearer", { session: false }),
		cors(config.cors)
	);

	// Binary FHIR resource generation
	router
		.route("/")
		.post(
			upload.single("document"),
			sanitize(config.sanitize),
			fhirBinary(),
			(req, res) => {
				res.send(res.locals.resource.binary);
			}
		)
		.put(
			upload.single("document"),
			sanitize(),
			fhirBinary(),
			(req, res) => {
				res.send(res.locals.resource.binary);
			}
		);

	return router;
};

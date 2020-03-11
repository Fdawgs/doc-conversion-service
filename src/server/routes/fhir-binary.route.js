const passport = require('passport');
const { Router } = require('express');

// Import middleware
const multer = require('multer');
const sanitize = require('sanitize-middleware');
const fhirBinary = require('../middleware/fhir-binary-resource.middleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router();

/**
 * @api {post} /api/converter/fhir/binary Binary - POST
 * @apiGroup FHIR
 * @apiDescription Convert any file passed to FHIR STU3 Binary Resource.
 *
 * @apiHeader {String=multipart/form-data} Content-Type
 *
 * @apiParam (Request body) {Binary} document Binary content such as text, image, pdf, zip archive, etc.
 *
 * @apiExample {curl} Example usage:
 * curl --request POST \
 *   --url http://localhost:8204/api/converter/fhir/binary \
 *   --header 'content-type: multipart/form-data' \
 *   --form document= \
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
 * @apiGroup FHIR
 * @apiDescription Convert any file passed to FHIR STU3 Binary Resource.
 *
 * @apiHeader {String=multipart/form-data} Content-Type
 *
 * @apiParam (Request body) {String} id Logical id of the artifact.
 * @apiParam (Request body) {Binary} document Binary content such as text, image, pdf, zip archive, etc.
 *
 * @apiExample {curl} Example usage:
 * curl --request PUT \
 *   --url http://localhost:8204/api/converter/fhir/binary \
 *   --header 'content-type: multipart/form-data' \
 *   --form document= \
 *   --form id=12 \
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
 * @description Handles routing for /fhir/binary path.
 * @param {Object=} config
 * @returns {Router} express router instance.
 */
module.exports = function fhirRoute(config) {
	router.use(passport.authenticate('bearer', { session: false }));

	// Binary FHIR resource generation
	router
		.route('/fhir/binary')
		.post(
			upload.single('document'),
			sanitize(config['fhir/binary']),
			fhirBinary(),
			(req, res, next) => {
				res.send(req.resource.binary);
				next();
			}
		)
		.put(upload.single('document'), fhirBinary(), (req, res, next) => {
			res.send(req.resource.binary);
			next();
		});

	return router;
};

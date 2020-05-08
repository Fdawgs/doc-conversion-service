const passport = require('passport');
const { Router } = require('express');

// Import middleware
const cors = require('cors');
const multer = require('multer');
const sanitize = require('sanitize-middleware');
const fhirDocumentReference = require('../middleware/fhir-documentreference-resource.middleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router();

/**
 * @api {options} /api/converter/fhir/documentreference DocumentReference - OPTIONS
 * @apiName OptionsHtml
 * @apiGroup FHIR
 * @apiDescription Support for preflight CORS requests.
 *
 * @apiHeader {String} Authorization Bearer token for authorization.
 *
 * @apiExample {curl} Example usage:
 * curl --request OPTIONS \
 * 	 --url https://ydh-watchdog.ydh.nhs.uk:8204/api/converter/fhir/documentreference \
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
 * @api {post} /api/converter/fhir/documentreference DocumentReference - POST
 * @apiName PostDocumentReference
 * @apiGroup FHIR
 * @apiDescription Convert any file passed to FHIR STU3 DocumentReference Resource that adheres to the Care-Connect profile.
 * Refer to <a>https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DocumentReference-1</a> for more info.
 *
 * @apiHeader {String} Authorization Bearer token for authorization.
 * @apiHeader {String=multipart/form-data} Content-Type
 *
 * @apiParam (Request body) {Binary} document Binary content such as text, image, pdf, zip archive, etc.
 *
 * @apiExample {curl} Example usage:
 * curl --request POST \
 *   --url http://localhost:8204/api/converter/fhir/documentreference \
 *   --header 'authorization: Bearer Jimmini' \
 *   --header 'content-type: multipart/form-data' \
 *   --form document=
 * @apiSuccessExample {json} Example Success Response:
 * HTTP/1.1 200 OK
 * {
 *     "meta": {
 *         "profile": [
 *             "https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DocumentReference-1"
 *         ]
 *     },
 *     "resourceType": "DocumentReference",
 *     "language": "English (Great Britain)",
 *     "indexed": "2020-02-21T14:55:19.873Z",
 *     "content": [
 *         {
 *             "attachment": {
 *                 "contentType": "application/pdf",
 *                 "data": "base64encodedstring",
 *                 "size": 583094
 *             }
 *         }
 *     ],
 *     "type": {
 *         "text": "test"
 *     },
 *     "status": "current",
 *     "id": "dd5eb00c-d964-48cf-821c-6ed9afde399d",
 *     "identifier": [
 *       {
 *         "system": "https://tools.ietf.org/html/rfc4122",
 *         "value": "dd5eb00c-d964-48cf-821c-6ed9afde399d"
 *       }
 *     ]
 * }
 */

/**
 * @api {put} /api/converter/fhir/documentreference DocumentReference - PUT
 * @apiName PutDocumentReference
 * @apiGroup FHIR
 * @apiDescription Convert any file passed to FHIR STU3 DocumentReference Resource that adheres to the Care-Connect profile.
 * Refer to <a>https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DocumentReference-1</a> for more info.
 *
 * @apiHeader {String} Authorization Bearer token for authorization.
 * @apiHeader {String=multipart/form-data} Content-Type
 *
 * @apiParam (Request body) {String} [id] Logical id of the artifact.
 * @apiParam (Request body) {Binary} document Binary content such as text, image, pdf, zip archive, etc.
 * @apiParam (Request body) {String} [subject] Who/what is the subject of the document
 * @apiParam (Request body) {String} [specialty] Clinical specialty of where the content was created.
 * @apiParam (Request body) {String} type Type of document.
 * @apiParam (Request body) {String=current, superseded, entered-in-error} status The status of the document reference.
 *
 * @apiExample {curl} Example usage:
 * curl --request PUT \
 *   --url http://localhost:8204/api/converter/fhir/documentreference \
 *   --header 'authorization: Bearer Jimmini' \
 *   --header 'content-type: multipart/form-data' \
 *   --form document= \
 *   --form id=12 \
 *   --form subject=999999 \
 *   --form specialty=Cardiology \
 *   --form 'type=Discharge Summary' \
 *   --form status=current
 * @apiSuccessExample {json} Example Success Response:
 * HTTP/1.1 200 OK
 * {
 *     "meta": {
 *         "profile": [
 *             "https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DocumentReference-1"
 *         ]
 *     },
 *     "resourceType": "DocumentReference",
 *     "language": "English (Great Britain)",
 *     "indexed": "2020-02-21T14:55:19.873Z",
 *     "content": [
 *         {
 *             "attachment": {
 *                 "contentType": "application/pdf",
 *                 "data": "base64encodedstring",
 *                 "size": 583094
 *             }
 *         }
 *     ],
 *     "subject": {
 *         "reference": "Patient/999999"
 *     },
 *     "type": {
 *         "text": "Discharge Summary"
 *     },
 *     "context": {
 *         "practiceSetting": {
 *             "text": "Cardiology"
 *         }
 *     },
 *     "status": "current",
 *     "id": 12
 * }
 */

/**
 * @author Frazer Smith
 * @description Handles routing to convert a request to a FHIR DocumentReference resource.
 * @param {Object} config
 * @param {Object} config.cors
 * @param {Object=} config.sanitize - Sanitization configuration values.
 * @returns {Router} Express router instance.
 */
module.exports = function fhirRoute(config) {
	router.use(
		passport.authenticate('bearer', { session: false }),
		sanitize(config.sanitize),
		cors(config.cors)
	);

	// DocumentReference FHIR resource generation
	router
		.route('/')
		.post(upload.array('document'), fhirDocumentReference(), (req, res) => {
			res.send(res.locals.resource.documentReference);
		})
		.put(upload.array('document'), fhirDocumentReference(), (req, res) => {
			res.send(res.locals.resource.documentReference);
		});

	return router;
};

const passport = require('passport');
const { Router } = require('express');

// Import middleware
const multer = require('multer');
const sanitize = require('sanitize-middleware');
const fhirDocumentReference = require('../middleware/fhir-documentreference-resource.middleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router();

/**
 * @api {post} /api/converter/fhir/documentreference DocumentReference - POST
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
 *   --header 'content-type: multipart/form-data' \
 *   --form document= \
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
 *   --header 'content-type: multipart/form-data' \
 *   --form document= \
 *   --form id=12 \
 *   --form subject=999999 \
 *   --form specialty=Cardiology \
 *   --form 'type=Discharge Summary' \
 *   --form status=current \
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
 * @description Handles routing for /fhir/documentreference path.
 * @param {Object=} config
 * @returns {Router} express router instance.
 */
module.exports = function fhirRoute(config) {
	router.use(passport.authenticate('bearer', { session: false }));
	router.use(sanitize(config['fhir/documentreference']));
	// DocumentReference FHIR resource generation
	router
		.route('/fhir/documentreference')
		.post(
			upload.array('document'),
			// TODO: Add middleware that derives values from document if possible
			(req, res, next) => {
				req.body.status = 'current';
				req.body.type = 'test';
				next();
			},
			fhirDocumentReference(),
			(req, res, next) => {
				res.send(req.resource.documentReference);
				next();
			}
		)
		.put(
			upload.array('document'),
			fhirDocumentReference(),
			(req, res, next) => {
				res.send(req.resource.documentReference);
				next();
			}
		);
	return router;
};

const { Router } = require('express');
const passport = require('passport');

// Import middleware
const multer = require('multer');
const fhirBinary = require('../middleware/fhir-binary-resource.middleware');
const fhirDocumentReference = require('../middleware/fhir-documentreference-resource.middleware');
const paramCheck = require('../middleware/param-check.middleware');
const sanitize = require('../middleware/sanitize.middleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router();

/**
 * @param {Object=} config
 * @returns {Router} express router instance.
 */
module.exports = function fhirRoute(config) {
	router.use(passport.authenticate('bearer', { session: false }), sanitize());

	// Binary FHIR resource generation
	router.post(
		'/fhir/binary',
		upload.single('document'),
		fhirBinary(),
		(req, res, next) => {
			res.send(req.resource.binary);
			next();
		}
	);

	router.put(
		'/fhir/binary',
		upload.single('document'),
		fhirBinary(),
		(req, res, next) => {
			res.send(req.resource.binary);
			next();
		}
	);

	// DocumentReference FHIR resource generation
	router.post(
		'/fhir/documentreference',
		upload.array('document'),
		// TODO: Add middleware that derives values from document if possible
		(req, res, next) => {
			req.body.status = 'current';
			req.body.type = 'test';
			next();
		},
		paramCheck(config['fhir/documentreference']),
		fhirDocumentReference(),
		(req, res, next) => {
			res.send(req.resource.documentReference);
			next();
		}
	);

	router.put(
		'/fhir/documentreference',
		upload.array('document'),
		paramCheck(config['fhir/documentreference']),
		fhirDocumentReference(),
		(req, res, next) => {
			res.send(req.resource.documentReference);
			next();
		}
	);
	return router;
};

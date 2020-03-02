const passport = require('passport');
const { Router } = require('express');

// Import middleware
const multer = require('multer');
const sanitize = require('sanitize-middleware');
const fhirBinary = require('../middleware/fhir-binary-resource.middleware');
const fhirDocumentReference = require('../middleware/fhir-documentreference-resource.middleware');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = new Router();

/**
 * @author Frazer Smith
 * @description Handles routing for /fhir/ path.
 * @param {Object=} config
 * @returns {Router} express router instance.
 */
module.exports = function fhirRoute(config) {
	router.use(passport.authenticate('bearer', { session: false }));

	// Binary FHIR resource generation
	router
		.route('/fhir/binary')
		.post(upload.single('document'), fhirBinary(), (req, res, next) => {
			res.send(req.resource.binary);
			next();
		})
		.put(upload.single('document'), fhirBinary(), (req, res, next) => {
			res.send(req.resource.binary);
			next();
		});

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
			sanitize(config['fhir/documentreference']),
			fhirDocumentReference(),
			(req, res, next) => {
				res.send(req.resource.documentReference);
				next();
			}
		)
		.put(
			upload.array('document'),
			sanitize(config['fhir/documentreference']),
			fhirDocumentReference(),
			(req, res, next) => {
				res.send(req.resource.documentReference);
				next();
			}
		);
	return router;
};

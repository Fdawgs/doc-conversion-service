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

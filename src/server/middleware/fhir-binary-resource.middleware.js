const uuidv4 = require('uuid/v4');

/**
 * @author Frazer Smith
 * @description Converts multipart request to STU3 FHIR Binary resource.
 * @return {Function} express middleware.
 */
module.exports = function fhirBinResourceMiddleware() {
	return (req, res, next) => {
		// Create resource object for conversion resource
		if (typeof req.resource === 'undefined') {
			req.resource = {};
		}

		let id;
		if (req.body.id) {
			id = req.body.id;
		} else {
			id = uuidv4();
		}

		const resource = {
			resourceType: 'Binary',
			id,
			language: 'English (Great Britain)',
			contentType: req.file.mimetype,
			content: req.file.buffer.toString('base64')
		};

		res.set('content-type', 'application/fhir+json');
		req.resource.binary = resource;
		next();
	};
};

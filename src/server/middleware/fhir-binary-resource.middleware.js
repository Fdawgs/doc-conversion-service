const { v4 } = require('uuid');

/**
 * @author Frazer Smith
 * @description Converts multipart request to STU3 FHIR Binary resource.
 * @return {Function} Express middleware.
 */
module.exports = function fhirBinResourceMiddleware() {
	return (req, res, next) => {
		if (req.file) {
			const resource = {
				resourceType: 'Binary',
				id: v4(),
				language: 'English (Great Britain)',
				contentType: req.file.mimetype,
				content: req.file.buffer.toString('base64')
			};
			Object.assign(resource, req.body);

			// Create resource object for conversion resource
			if (typeof req.resource === 'undefined') {
				req.resource = {};
			}

			res.set('content-type', 'application/fhir+json');
			req.resource.binary = resource;
			next();
		} else {
			res.status(400);
			next('File missing from request');
		}
	};
};

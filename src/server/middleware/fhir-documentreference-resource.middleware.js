const uuidv4 = require('uuid/v4');

/**
 * @author Frazer Smith
 * @description Converts multipart request to STU3 FHIR DocumentReference resource
 * that adheres to the Care-Connect profile.
 * Refer to https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DocumentReference-1 for more info.
 * @return {Function} express middleware.
 */
module.exports = function fhirDocumentReferenceResourceMiddleware() {
	return (req, res, next) => {
		// Create resource object for conversion resource
		if (typeof req.resource === 'undefined') {
			req.resource = {};
		}

		/**
		 * Hard-coding meta profile and resourceType into resource as this should not
		 * be changed for this resource, ever.
		 */
		const resource = {
			meta: {
				profile: [
					'https://fhir.hl7.org.uk/STU3/StructureDefinition/CareConnect-DocumentReference-1'
				]
			},
			resourceType: 'DocumentReference',
			language: 'English (Great Britain)',
			indexed: new Date().toISOString(),
			content: []
		};

		// Push params into their respective objects
		if (req.body.subject) {
			resource.subject = {
				reference: `Patient/${req.body.subject}`
			};
		}
		if (req.body.type) {
			resource.type = {
				// TODO: extend with coding array
				text: req.body.type
			};
		}
		if (req.body.specialty) {
			resource.context = {
				practiceSetting: {
					text: req.body.specialty
				}
			};
		}
		if (req.body.status) {
			resource.status = req.body.status;
		}

		// Generate a unique ID if one not provided
		if (req.body.id) {
			resource.id = req.body.id;
		} else {
			const generatedId = uuidv4();
			resource.id = generatedId;
			resource.identifier = [
				{
					system: 'https://tools.ietf.org/html/rfc4122',
					value: generatedId
				}
			];
		}

		// Populate content array with document objects
		req.files.forEach((element) => {
			const contentObject = {
				attachment: {
					contentType: element.mimetype,
					data: element.buffer.toString('base64'),
					size: element.size
				}
			};
			resource.content.push(contentObject);
		});

		res.set('content-type', 'application/fhir+json');
		req.resource.documentReference = resource;
		next();
	};
};

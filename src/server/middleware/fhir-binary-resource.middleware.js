const { v4 } = require("uuid");

/**
 * @author Frazer Smith
 * @description Converts multipart request to STU3 FHIR Binary resource.
 * @returns {Function} Express middleware.
 */
module.exports = function fhirBinResourceMiddleware() {
	return (req, res, next) => {
		if (req.file) {
			const resource = {
				resourceType: "Binary",
				id: v4(),
				language: "English (Great Britain)",
				contentType: req.file.mimetype,
				content: req.file.buffer.toString("base64"),
			};
			Object.assign(resource, req.body);

			// Create resource object for conversion resource
			if (typeof res.locals.resource === "undefined") {
				res.locals.resource = {};
			}

			res.set("content-type", "application/fhir+json");
			res.locals.resource.binary = resource;
			next();
		} else {
			res.status(400);
			next(new Error("File missing from request"));
		}
	};
};

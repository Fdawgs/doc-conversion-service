const fileType = require("file-type");

/**
 * @author Frazer Smith
 * @param {Array=} acceptedMimeTypes - Array of accepted MIME types
 * i.e. `['application/pdf', 'application/rtf']`.
 * @description Validate file type in `req.body`.
 * The Content-Type header can be spoofed so is not trusted implicitly,
 * this middleware provides an extra level of validation.
 * @returns {Function} Express middleware.
 */
module.exports = function validateFileTypeMiddleware(acceptedMimeTypes) {
	// eslint-disable-next-line no-unused-vars
	return async (req, res, next) => {
		try {
			const { mime } = await fileType.fromBuffer(req.body);
			if (!acceptedMimeTypes.includes(mime)) {
				res.status(400);
				next(new Error("File type not accepted"));
			} else {
				next();
			}
		} catch (err) {
			res.status(400);
			next(new Error("File type not accepted"));
		}
	};
};

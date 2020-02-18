/**
 * @author Frazer Smith
 * @description Retrieve all param keys from form and check all essential ones are present.
 *
 * @param {Array} requiredParams - Array of keys required to proceed.
 * @return {Function} express middleware.
 */
module.exports = function paramCheckMiddleware(requiredParams) {
	return (req, res, next) => {
		try {
			const keys = Object.keys(req.body);
			if (
				requiredParams.every((element) =>
					keys
						.map((x) => x.toLowerCase())
						.includes(element.toLowerCase())
				)
			) {
				next();
			} else {
				res.status(400).send(
					`An essential parameter is missing from the list: ${requiredParams
						.join(', ')
						.toString()}`
				);
			}
		} catch (error) {
			res.status(400).send(
				`An essential parameter is missing from the list: ${requiredParams
					.join(', ')
					.toString()}`
			);
		}
	};
};

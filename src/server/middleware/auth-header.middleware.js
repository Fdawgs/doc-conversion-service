/**
 * @author Frazer Smith
 * @description Checks 'authorization' request header value against array of api key objects.
 * @param {Array.<{value: String}>} keyArray - Array of API key objects.
 * @return {Function} express middleware.
 */
module.exports = function authHeaderMiddleware(keyArray) {
	return (req, res, next) => {
		if (req.token) {
			const keys = [];
			keyArray.forEach((element) => {
				keys.push(element.value);
			});

			if (keys.includes(req.token)) {
				next();
			} else {
				next({ status: 401 });
			}
		} else {
			next({ status: 401 });
		}
	};
};

/**
 * @author Frazer Smith
 * @description Checks 'authorization' request header value against array of API key objects.
 * @param {String} token - Bearer token.
 * @param {Function} callback - PassportJS strategy callback.
 * @param {Array.<{value: String}>} keyArray - Array of API key objects.
 * @return {String} sanitized query string.
 */
module.exports = function bearerTokenAuthentication(
	token,
	callback,
	authArray
) {
	const keys = [];
	authArray.forEach((element) => {
		keys.push(element.value);
	});

	if (keys.includes(token)) {
		return callback(null, token);
	}
	return callback(null, false);
};

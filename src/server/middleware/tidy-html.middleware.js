const { JSDOM } = require("jsdom");
const { tidy } = require("htmltidy2");
const util = require("util");

const tidyHtml = util.promisify(tidy);

/**
 * @author Frazer Smith
 * @description Uses HTMLTidy2 to parse and tidy HTML in `res.locals.body`.
 * @param {object=} config - HTMLTidy2 configuration values.
 * @returns {Function} Express middleware.
 */
module.exports = function tidyHtmlMiddleware(config = {}) {
	return async (req, res, next) => {
		try {
			const dom = new JSDOM(res.locals.body);

			// Set document language
			const html = dom.window.document.querySelector("html");
			html.setAttribute("lang", "en");
			html.setAttribute("xml:lang", "en");
			const parsedHtml = dom.window.document.documentElement.outerHTML;

			res.locals.body = await tidyHtml(parsedHtml, config);

			next();
		} catch (err) {
			res.status(400);
			next(err);
		}
	};
};

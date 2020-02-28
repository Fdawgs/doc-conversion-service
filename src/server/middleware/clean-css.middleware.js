const CSSOM = require('cssom');
const { JSDOM } = require('jsdom');

/**
 * @author Frazer Smith
 * @description Resolves most common issues with CSS generated during conversion process.
 * Adds no-break to stop pages overrunning each other when text is too big for its' original page.
 * @param {String=} req.query.fonts - Comma seperated list of fonts to replace document's original fonts with.
 * @return {Function} Express middleware.
 */
module.exports = function cleanCssMiddleware() {
	return (req, res, next) => {
		const dom = new JSDOM(req.body);
		const styles = dom.window.document.querySelectorAll('style');

		let newFonts;
		if (req.query && req.query.fonts) {
			newFonts = String(req.query.fonts);
		}

		// Create results object for conversion results
		if (typeof req.results === 'undefined') {
			req.results = {};
		}

		styles.forEach((element) => {
			// Remove optional type attribute
			if (element.hasAttribute('type')) {
				element.removeAttribute('type');
			}

			const styleObj = CSSOM.parse(element.innerHTML);

			styleObj.cssRules.forEach((styleRule) => {
				// Replace default font
				if (
					typeof newFonts === 'string' &&
					styleRule.style['font-family']
				) {
					styleRule.style.setProperty('font-family', newFonts);
				}

				// Stop pages overrunning the next, leading to overlapped text
				if (styleRule.selectorText.substring(0, 3) === 'div') {
					styleRule.style.setProperty('page-break-inside', 'avoid');
				}
			});

			// eslint-disable-next-line no-param-reassign
			element.innerHTML = styleObj
				.toString()
				.replace(/<!--/gi, '')
				.replace(/;}/gi, '}');
		});

		if (styles.length > 0) {
			req.results.clean_css = 'Fixed';
		} else {
			req.results.clean_css = 'Passed';
		}

		req.body = dom.window.document.documentElement.outerHTML;

		next();
	};
};

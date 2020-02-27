const CSSOM = require('cssom');
const { JSDOM } = require('jsdom');

/**
 * @author Frazer Smith
 * @description Resolves most common issues with CSS generated during conversion process.
 * Adds no-break to stop pages overrunning each other when text is too big for its' original page.
 * @param {String=} fonts - Comma seperated list of fonts to replace document's original fonts with.
 * Defaults to "arial, sans-serif".
 * @param {Number=} fontSize - Pixel size of text.
 * Will only increase font size of sections with a size less than 10.
 * Defaults to 10.
 * @return {Function} Express middleware.
 */
module.exports = function cleanCssMiddleware(fonts, fontSize) {
	return (req, res, next) => {
		const dom = new JSDOM(req.body);
		const styles = dom.window.document.querySelectorAll('style');

		let newFonts = 'arial, sans-serif';
		if (fonts) {
			newFonts = String(fonts);
		}
		let newFontSize = 10;
		if (fontSize) {
			newFontSize = Number(fontSize);
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
					if (styleRule.style['font-family']) {
						styleRule.style.setProperty('font-family', newFonts);
					}

					// Stop pages overrunning the next, leading to overlapped text
					if (styleRule.selectorText.substring(0, 3) === 'div') {
						styleRule.style.setProperty(
							'page-break-inside',
							'avoid'
						);
					}

					// Increase size of fonts to increase readability
					if (styleRule.style['font-size']) {
						const docFontSize = styleRule.style[
							'font-size'
						].substring(0, styleRule.style['font-size'].length - 2);

						if (Number(docFontSize) < newFontSize) {
							styleRule.style.setProperty(
								'font-size',
								`${newFontSize}px`
							);
						}
					}
				});

				// eslint-disable-next-line no-param-reassign
				element.innerHTML = styleObj.toString().replace(/<!--/ig, '').replace(/;}/ig, '}');
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

const fs = require('fs');
const { JSDOM } = require('jsdom');
const path = require('path');
const { Poppler } = require('node-poppler');
const { v4 } = require('uuid');

/**
 * @author Frazer Smith
 * @description Uses Poppler to convert PDF to HTML and places both files in a temporary directory.
 * @param {Object=} config - Poppler conversion configuration values.
 * @param {String=} config.tempDirectory - directory for temporarily storing
 * files during conversion.
 * Defaults to "src/server/temp".
 * @param {String=} config.encoding - Sets the encoding to use for text output.
 * Defaults to "UTF-8".
 * @param {String=} config.binPath - Path of poppler-utils binaries.
 * @param {Object=} config.pdftoHtmlOptions - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/master/API.md#popplerpdftohtmloptions-file--promise
 * for options.
 * @return {Function} Express middleware.
 */
module.exports = function popplerMiddleware(config = {}) {
	return async (req, res, next) => {
		// Define any default settings the middleware should have to get up and running
		const defaultConfig = {
			binPath: undefined,
			encoding: 'UTF-8',
			pdftoHtmlOptions: {
				complexOutput: true,
				singlePage: true,
				outputEncoding: 'UTF-8'
			},
			tempDirectory: `${path.resolve(__dirname, '..')}\\temp\\`
		};
		this.config = Object.assign(defaultConfig, config);

		if (!fs.existsSync(this.config.tempDirectory)) {
			fs.mkdirSync(this.config.tempDirectory);
		}

		// Build temporary files for Poppler and following middleware to read from
		const id = v4();
		const tempPdfFile = `${this.config.tempDirectory}${id}.pdf`;
		const tempHtmlFile = `${this.config.tempDirectory}${id}-html.html`;
		try {
			fs.writeFileSync(tempPdfFile, req.body);

			const poppler = new Poppler(this.config.binPath);

			await poppler
				.pdfToHtml(this.config.pdftoHtmlOptions, tempPdfFile)
				.then(() => {
					const dom = new JSDOM(
						fs.readFileSync(tempHtmlFile, {
							encoding: this.config.encoding
						})
					);

					// Set document language
					const html = dom.window.document.querySelector('html');
					html.setAttribute('lang', 'en');
					html.setAttribute('xml:lang', 'en');

					// Remove excess title and meta tags left behind by Poppler
					const titles = dom.window.document.querySelectorAll(
						'title'
					);
					for (let index = 1; index < titles.length; index += 1) {
						titles[index].parentNode.removeChild(titles[index]);
					}
					const metas = dom.window.document.querySelectorAll('meta');
					for (let index = 1; index < metas.length; index += 1) {
						metas[index].parentNode.removeChild(metas[index]);
					}

					req.body = dom.window.document.documentElement.outerHTML;

					req.doclocation = {
						directory: this.config.tempDirectory,
						html: tempHtmlFile,
						id,
						pdf: tempPdfFile
					};
					next();
				});
		} catch {
			res.status(400);
			next(new Error('Failed to convert PDF to HTML'));
		}
	};
};

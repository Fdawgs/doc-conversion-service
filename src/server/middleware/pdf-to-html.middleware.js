const fs = require("fs").promises;
const { JSDOM } = require("jsdom");
const path = require("path");
const { Poppler } = require("node-poppler");
const { v4 } = require("uuid");

/**
 * @author Frazer Smith
 * @description Uses Poppler to convert PDF file in `req.body` to HTML and places both files in a temporary directory.
 * Will not process passed file if content-type header not set to `application/pdf`.
 * @param {object=} config - Poppler conversion configuration values.
 * @param {string=} config.binPath - Path of poppler-utils binaries.
 * @param {string=} config.encoding - Sets the encoding to use for text output.
 * Defaults to "UTF-8".
 * @param {object=} config.pdfToHtmlOptions - Refer to
 * https://github.com/Fdawgs/node-poppler/blob/master/API.md#Poppler+pdfToHtml
 * for options.
 * @param {string=} config.tempDirectory - directory for temporarily storing
 * files during conversion.
 * Defaults to `src/server/temp` if not set.
 * @returns {Function} Express middleware.
 */
module.exports = function pdfToHtmlMiddleware(config = {}) {
	return async (req, res, next) => {
		if (req.headers["content-type"] === "application/pdf") {
			try {
				// Define any default settings the middleware should have to get up and running
				const defaultConfig = {
					binPath: undefined,
					encoding: "UTF-8",
					pdfToHtmlOptions: {
						complexOutput: true,
						singlePage: true,
					},
					tempDirectory: `${path.resolve(__dirname, "..")}/temp/`,
				};
				this.config = Object.assign(defaultConfig, config);

				/**
				 * Remove params used by tidy-css and embed-html-images middleware
				 * to avoid pdfToHtml function throwing error due to invalid params passed to it,
				 * as well as pdfToHtml params that will break the route.
				 */
				const query = { ...req.query };
				const pdfToHtmlUnwantedParams = [
					"backgroundColor",
					"complexOutput",
					"fonts",
					"noFrames",
					"noRoundedCoordinates",
					"printVersionInfo",
					"removeAlt",
					"stdout",
					"singlePage",
					"quiet",
					"xmlOutput",
				];
				pdfToHtmlUnwantedParams.forEach((value) => {
					if (Object.prototype.hasOwnProperty.call(query, value)) {
						delete query[value];
					}
				});
				this.config.pdftoHtmlOptions = Object.assign(
					this.config.pdfToHtmlOptions,
					query
				);

				try {
					await fs.access(this.config.tempDirectory);
				} catch (err) {
					await fs.mkdir(this.config.tempDirectory);
				}

				// Build temporary files for Poppler and following middleware to read from
				const id = v4();
				const tempPdfFile = `${this.config.tempDirectory}${id}.pdf`;
				const tempHtmlFile = `${this.config.tempDirectory}${id}-html.html`;

				await fs.writeFile(tempPdfFile, req.body);

				const poppler = new Poppler(this.config.binPath);

				await poppler.pdfToHtml(
					tempPdfFile,
					this.config.pdfToHtmlOptions
				);

				const dom = new JSDOM(
					await fs.readFile(tempHtmlFile, {
						encoding: this.config.encoding,
					})
				);

				// Remove excess title and meta tags left behind by Poppler
				const titles = dom.window.document.querySelectorAll("title");
				for (let index = 1; index < titles.length; index += 1) {
					titles[index].parentNode.removeChild(titles[index]);
				}
				const metas = dom.window.document.querySelectorAll("meta");
				for (let index = 1; index < metas.length; index += 1) {
					metas[index].parentNode.removeChild(metas[index]);
				}

				res.locals.body = dom.window.document.documentElement.outerHTML;

				res.locals.doclocation = {
					directory: this.config.tempDirectory,
					html: tempHtmlFile,
					id,
					pdf: tempPdfFile,
				};
				next();
			} catch (err) {
				res.status(400);
				next(new Error("Failed to convert PDF file to HTML"));
			}
		} else {
			next();
		}
	};
};

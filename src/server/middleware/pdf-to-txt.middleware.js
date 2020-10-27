const fs = require('fs').promises;
const path = require('path');
const { Poppler } = require('node-poppler');
const { v4 } = require('uuid');

/**
 * @author Frazer Smith
 * @description Uses Poppler to convert PDF file in `req.body` to TXT.
 * @param {object=} config - Poppler conversion configuration values.
 * @param {string=} config.binPath - Path of poppler-utils binaries.
 * @param {string=} config.tempDirectory - directory for temporarily storing
 * files during conversion.
 * @returns {Function} Express middleware.
 */
module.exports = function pdfToTxtMiddleware(config = {}) {
	return async (req, res, next) => {
		if (req.headers['content-type'] === 'application/pdf') {
			try {
				// `pdfToText` Poppler function still attempts to parse empty bodies/input and produces results
				// so catch them here
				if (
					req.body === undefined ||
					Object.keys(req.body).length === 0
				) {
					throw new Error();
				}
				// Define any default settings the middleware should have to get up and running
				const defaultConfig = {
					binPath: undefined,
					tempDirectory: `${path.resolve(__dirname, '..')}/temp/`
				};
				this.config = Object.assign(defaultConfig, config);

				/**
				 * Remove pdfToTxt params that will break the route.
				 */
				const query = { ...req.query };
				const pdfToTxtUnwantedParams = ['printVersionInfo', 'quiet'];
				pdfToTxtUnwantedParams.forEach((value) => {
					if (Object.prototype.hasOwnProperty.call(query, value)) {
						delete query[value];
					}
				});

				try {
					await fs.access(this.config.tempDirectory);
				} catch (err) {
					await fs.mkdir(this.config.tempDirectory);
				}

				// Build temporary files for Poppler and following middleware to read from
				const id = v4();
				const tempPdfFile = `${this.config.tempDirectory}${id}.pdf`;

				await fs.writeFile(tempPdfFile, req.body);

				const poppler = new Poppler(this.config.binPath);

				res.locals.body = await poppler.pdfToText(query, tempPdfFile);

				res.locals.doclocation = {
					directory: this.config.tempDirectory,
					id,
					pdf: tempPdfFile
				};
				next();
			} catch (err) {
				res.status(400);
				next(new Error('Failed to convert PDF file to TXT'));
			}
		} else {
			next();
		}
	};
};

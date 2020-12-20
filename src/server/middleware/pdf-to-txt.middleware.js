const fs = require('fs').promises;
const glob = require('glob');
const path = require('path');
const { Poppler } = require('node-poppler');
const { v4 } = require('uuid');
const imageToTxt = require('../utils/image-to-txt.utils');

/**
 * @author Frazer Smith
 * @description Uses Poppler (and Tesseract OCR if enabled) to convert PDF file in `req.body` to TXT.
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
				 * Remove pdfToTxt and pdfToCairo params that will break the route.
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

				res.locals.doclocation = {
					directory: this.config.tempDirectory,
					id,
					pdf: tempPdfFile
				};

				if (query && query.ocr === true) {
					res.locals.body = '';

					/**
					 * Remove pdfToTxt params that will cause pdfToCairo to throw error.
					 */
					const pdfToCairoAcceptedParams = [
						'cropHeight',
						'cropWidth',
						'cropXAxis',
						'cropYAxis',
						'firstPageToConvert',
						'lastPageToConvert'
					];
					Object.keys(query).forEach((value) => {
						if (
							pdfToCairoAcceptedParams.includes(value) === false
						) {
							delete query[value];
						}
					});

					await poppler.pdfToCairo(
						tempPdfFile,
						`${this.config.tempDirectory}${id}`,
						{ pngFile: true, ...query }
					);

					const files = glob.sync(
						`${this.config.tempDirectory}${id}*.png`
					);

					await Promise.all(
						files.map((file) => imageToTxt(file, 'eng'))
					).then(
						(results) => {
							res.locals.body = results.toString();
							return next();
						},
						(err) => next(err)
					);
				} else {
					res.locals.body = await poppler.pdfToText(
						tempPdfFile,
						undefined,
						query
					);
					next();
				}
			} catch (err) {
				res.status(400);
				next(new Error('Failed to convert PDF file to TXT'));
			}
		} else {
			next();
		}
	};
};

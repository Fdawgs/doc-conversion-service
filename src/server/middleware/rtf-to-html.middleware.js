const fs = require('fs').promises;
const path = require('path');
const { UnRTF } = require('node-unrtf');
const { v4 } = require('uuid');

/**
 * @author Frazer Smith
 * @description Uses UnRTF to convert PDF file in `req.body` to TXT.
 * @param {object=} config - UnRTF conversion configuration values.
 * @param {string=} config.binPath - Path of UnRTF binary.
 * @param {string=} config.tempDirectory - directory for temporarily storing
 * files during conversion.
 * @returns {Function} Express middleware.
 */
module.exports = function rtfToHtmlMiddleware(config = {}) {
	return async (req, res, next) => {
		if (req.headers['content-type'] === 'application/rtf') {
			try {
				// Define any default settings the middleware should have to get up and running
				const defaultConfig = {
					binPath: undefined,
					unRtfOptions: {
						noPictures: true,
						outputHtml: true
					},
					tempDirectory: `${path.resolve(__dirname, '..')}/temp/`
				};
				this.config = Object.assign(defaultConfig, config);

				try {
					await fs.access(this.config.tempDirectory);
				} catch (err) {
					await fs.mkdir(this.config.tempDirectory);
				}

				// Build temporary files for Poppler and following middleware to read from
				const id = v4();
				const tempRtfFile = `${this.config.tempDirectory}${id}.rtf`;

				await fs.writeFile(tempRtfFile, req.body);

				const unrtf = new UnRTF(this.config.binPath);

				const html = await unrtf.convert(
					tempRtfFile,
					this.config.pdfToHtmlOptions
				);

				res.locals.body = html;

				res.locals.doclocation = {
					directory: this.config.tempDirectory,
					id,
					rtf: tempRtfFile
				};
				next();
			} catch (err) {
				res.status(400);
				next(new Error('Failed to convert RTF file to HTML'));
			}
		} else {
			next();
		}
	};
};

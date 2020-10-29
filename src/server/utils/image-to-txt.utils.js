const { createWorker } = require('tesseract.js');

const worker = createWorker();

/**
 * @author Frazer Smith
 * @description Utility to convert images of text to text strings,
 * using Tesseract optical character recognition (OCR) engine.
 * @param {string|Buffer} image - A path to an image, a Buffer
 * storing a binary image, or a base64 encoded image.
 * @param {string=} languages - Languages to load trained data for.
 * Multiple languages are concatenated with a `+` i.e. `eng+chi_tra`
 * for English and Chinese Traditional languages.
 * @returns {Promise<string|Error>} Promise of text retrieve
 * from image as string on resolve, or Error object on rejection.
 */
module.exports = async function imageToTxtUtil(image, languages) {
	try {
		await worker.load();
		await worker.loadLanguage(languages);
		await worker.initialize(languages);

		const {
			data: { text }
		} = await worker.recognize(image);

		await worker.terminate();
		return text;
	} catch (err) {
		return err;
	}
};

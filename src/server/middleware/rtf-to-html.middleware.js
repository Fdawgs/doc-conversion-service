/* eslint-disable no-param-reassign */
const { JSDOM, VirtualConsole } = require('jsdom');

/**
 * @author Tom Zöhner
 * @author Frazer Smith
 * @description Converts RTF files to HTML.
 * Will not process passed file if content-type header not set to `application/rtf`.
 *
 * Adapted from Tom Zöhner's example in rtf.js repo to be asynchronous.
 * @param {ArrayBuffer} rtf - Binary RTF file.
 * @returns {Promise<string|Error>} Promise of HTML string on resolve, or Error object on rejection.
 */
function rtfJs(rtf) {
	return new Promise((resolve, reject) => {
		const virtualConsole = new VirtualConsole();
		virtualConsole.sendTo(console);

		// eslint-disable-next-line no-new
		new JSDOM(
			`
    <script src="../../../node_modules/rtf.js/dist/WMFJS.bundle.js"></script>
    <script src="../../../node_modules/rtf.js/dist/EMFJS.bundle.js"></script>
    <script src="../../../node_modules/rtf.js/dist/RTFJS.bundle.js"></script>

	<script>
        RTFJS.loggingEnabled(false);
        WMFJS.loggingEnabled(false);
        EMFJS.loggingEnabled(false);

        try {
            const doc = new RTFJS.Document(rtfFile);

            doc.render().then(function(htmlElements) {
                const div = document.createElement("div");
                div.append(...htmlElements);

                window.done(div.innerHTML);
            }).catch(err => window.onerror(err))
        } catch (err){
            window.onerror(err)
        }
    </script>
    `,
			{
				resources: 'usable',
				runScripts: 'dangerously',
				url: `file://${__dirname}/`,
				virtualConsole,
				beforeParse(window) {
					window.rtfFile = rtf;
					window.done = (html) => {
						resolve(html);
					};
					window.onerror = (error) => {
						reject(new Error(error));
					};
				}
			}
		);
	});
}

/**
 * @author Frazer Smith
 * @description Uses rtf.js to convert RTF file in `req.body` to HTML.
 * @returns {Function} Express middleware.
 */
module.exports = function rtfToHtmlMiddleware() {
	return async (req, res, next) => {
		if (req.headers['content-type'] === 'application/rtf') {
			try {
				req.body = await rtfJs(req.body);
				next();
			} catch {
				res.status(400);
				next(new Error('Failed to convert RTF file to HTML'));
			}
		} else {
			next();
		}
	};
};

const { Router } = require('express');
const glob = require('glob');
const fs = require('fs');
const passport = require('passport');

// Import middleware
const bodyParser = require('body-parser');
const embedHtmlImages = require('../middleware/embed-html-images.middleware');
const fixCss = require('../middleware/clean-css.middleware');
const fixWin1252Artifacts = require('../middleware/win1252-artifacts.middleware');
const htmltidy = require('../middleware/htmltidy.middleware');
const poppler = require('../middleware/poppler.middleware');
const sanitize = require('../middleware/sanitize.middleware');

const router = new Router();

/**
 * @param {Object} config
 * @param {Object=} config.htmltidy
 * @param {Object=} config.poppler
 * @param {Object} config.accepted_params
 * @returns {Router} express router instance.
 */
module.exports = function htmlRoute(config) {
	router.put(
		'/html',
		passport.authenticate('bearer', { session: false }),
		sanitize(config.accepted_params),
		bodyParser.raw({ type: ['application/pdf'], limit: '20mb' }),
		poppler(config.poppler),
		htmltidy(config.htmltidy),
		fixWin1252Artifacts(),
		embedHtmlImages(),
		fixCss(),
		// Delete temporary files after it has been converted to HTML
		(req, res, next) => {
			const files = glob.GlobSync(
				`${req.doclocation.directory}/${req.doclocation.id}*`
			).found;
			files.forEach((file) => {
				fs.unlink(file, (err) => {
					if (err) {
						throw new Error(err);
					}
				});
			});
			res.send(req.body);
			next();
		}
	);

	return router;
};

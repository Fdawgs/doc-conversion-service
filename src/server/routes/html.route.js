const { Router } = require('express');
const glob = require('glob');
const fs = require('fs');
const passport = require('passport');

// Import middleware
const bodyParser = require('body-parser');
const sanitize = require('sanitize-middleware');
const embedHtmlImages = require('../middleware/embed-html-images.middleware');
const fixCss = require('../middleware/clean-css.middleware');
const fixWin1252Artifacts = require('../middleware/win1252-artifacts.middleware');
const htmltidy = require('../middleware/htmltidy.middleware');
const poppler = require('../middleware/poppler.middleware');

const router = new Router();

/**
 * @author Frazer Smith
 * @description Handles routing for /html/ path.
 * @param {Object} config
 * @param {Object=} config.htmltidy - HTMLTidy2 configuration values.
 * @param {Object=} config.poppler - Poppler conversion configuration values.
 * @param {Object} config.accepted_params - Sanitization configuration values.
 * @returns {Router} express router instance.
 */
module.exports = function htmlRoute(config) {
	router.use(
		passport.authenticate('bearer', { session: false }),
		sanitize(config.accepted_params)
	);

	router.put(
		'/html',
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
			res.send(`<!DOCTYPE html>${req.body}`);
			next();
		}
	);

	return router;
};

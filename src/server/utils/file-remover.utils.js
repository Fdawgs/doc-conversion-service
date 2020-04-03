const glob = require('glob');
const fs = require('fs');

/**
 * @author Frazer Smith
 * @description Delete files that match a glob pattern.
 * @param {String=} pattern
 */
module.exports = function fileRemoverUtil(pattern) {
	const files = glob.GlobSync(pattern).found;
	files.forEach((file) => {
		fs.unlink(file, (err) => {
			if (err) {
				throw new Error(err);
			}
		});
	});
};

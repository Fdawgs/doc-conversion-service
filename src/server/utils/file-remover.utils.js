const glob = require('glob');
const fs = require('fs');

/**
 * @author Frazer Smith
 * @description Delete files that match a glob pattern.
 * @param {string=} pattern
 */
module.exports = function fileRemoverUtil(pattern) {
	const files = glob.GlobSync(pattern).found;
	files.forEach((file) => {
		fs.unlinkSync(file);
	});
};

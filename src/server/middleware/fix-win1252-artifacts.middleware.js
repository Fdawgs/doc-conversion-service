/* eslint-disable quote-props */
/**
 * @author Frazer Smith
 * @description Replace most common incorrectly converted Windows-1252
 * to UTF-8 results with HTML equivalents.
 * Refer to https://www.i18nqa.com/debug/utf8-debug.html for more info.
 * @return {Function} express middleware.
 */
module.exports = function fixWin1252ArtifactsMiddleware() {
	return async (req, res, next) => {
		let html = req.body;

		// Create results object for conversion results
		if (typeof req.results === 'undefined') {
			req.results = {};
		}

		const mapObj = {
			'â‚¬': '&euro;',
			'â€š': '&sbquo;',
			'Æ’': '&fnof;',
			'â€ž': '&bdquo;',
			'â€¦': '&hellip;',
			'â€¡': '&Dagger;',
			'Ë†': '&circ;',
			'â€°': '&permil;',
			'â€¹': '&lsaquo;',
			'Å½': '&Zcaron;',
			'â€˜': '&lsquo;',
			'â€™': '&rsquo;',
			'â€œ': '&ldquo;',
			'â€¢': '&bull;',
			'â€“': '&ndash;',
			'â€”': '&mdash;',
			Ëœ: '&#771;',
			'Å¡': '&scaron;',
			'Å¾': '&zcaron;',
			'Å¸': '&Yuml;',
			'Â¯': '&macr;',
			'Â·': '&middot;',
			'Â´': '&acute;',
			'Â°': '&deg;',
			'Ã‚': '&nbsp;',
			'ï‚·': '&bull;',
			âˆš: '&radic;',
			'�': '',
			'Ã€': '&Agrave;',
			Ãƒ: '&Atilde;',
			'Ã„': '&Auml;',
			'Ã…': '&Aring;',
			'Ã†': '&AElig;',
			'Ã‡': '&Ccedil;',
			Ãˆ: '&Egrave;',
			'Ã‰': '&Eacute;',
			ÃŠ: '&Ecirc;',
			'Ã‹': '&Euml;',
			ÃŒ: '&Lgrave;',
			ÃŽ: '&Lcirc;',
			'Ã‘': '&Ntilde;',
			'Ã’': '&Ograve;',
			'Ã“': '&Oacute;',
			'Ã”': '&Ocirc;',
			'Ã•': '&Otilde;',
			'Ã–': '&Ouml;',
			'Ã—': '&times;',
			'Ã˜': '&Oslash;',
			'Ã™': '&Ugrave;',
			Ãš: '&Uacute;',
			'Ã›': '&Ucirc;',
			Ãœ: '&Uuml;',
			Ãž: '&THORN;',
			ÃŸ: '&szlig;',
			'Ã¡': '&aacute;',
			'Ã¢': '&acirc;',
			'Ã£': '&atilde;',
			'Ã¤': '&auml;',
			'Ã¥': '&aring;',
			'Ã¦': '&aelig;',
			'Ã§': '&ccedil;',
			'Ã¨': '&egrave;',
			'Ã©': '&eacute;',
			Ãª: '&ecirc;',
			'Ã«': '&euml;',
			'Ã¬': '&igrave;',
			'Ã­': '&iacute;',
			'Ã®': '&icirc;',
			'Ã¯': '&iuml;',
			'Ã°': '&eth;',
			'Ã±': '&ntilde;',
			'Ã²': '&ograve;',
			'Ã³': '&oacute;',
			'Ã´': '&ocirc;',
			Ãµ: '&otilde;',
			'Ã¶': '&ouml;',
			'Ã·': '&divide;',
			'Ã¸': '&oslash;',
			'Ã¹': '&ugrave;',
			Ãº: '&uacute;',
			'Ã»': '&ucirc;',
			'Ã¼': '&uuml;',
			'Ã½': '&yacute;',
			'Ã¾': '&thorn;',
			'Ã¿': '&yuml;',
			'â‰¤': '&le;',
			'â‰¥': '&ge;'
		};

		const secMapObj = {
			Â: '&nbsp;',
			Ã: '&Aacute;',
			'â€': '&rdquo;',
			'�': ''
		};

		html = html.replace(
			/â‚¬|â€š|Æ’|â€ž|â€¦|â€¡|Ë†|â€°|â€¹|Å½|â€˜|â€™|â€œ|â€¢|â€“|â€”|Ëœ|Å¡|Å¾|Å¸|Â¯|Â·|Â´|Â°|Ã‚|ï‚·|âˆš|�|Ã€|Ãƒ|Ã„|Ã…|Ã†|Ã‡|Ãˆ|Ã‰|ÃŠ|Ã‹|ÃŒ|ÃŽ|Ã‘|Ã’|Ã“|Ã”|Ã•|Ã–|Ã—|Ã˜|Ã™|Ãš|Ã›|Ãœ|Ãž|ÃŸ|Ã¡|Ã¢|Ã£|Ã¤|Ã¥|Ã¦|Ã§|Ã¨|Ã©|Ãª|Ã«|Ã¬|Ã­|Ã®|Ã¯|Ã°|Ã±|Ã²|Ã³|Ã´|Ãµ|Ã¶|Ã·|Ã¸|Ã¹|Ãº|Ã»|Ã¼|Ã½|Ã¾|Ã¿|â‰¤|â‰¥/g,
			(matched) => mapObj[matched]
		);

		const secondPass = html.replace(
			/Â|Ã|â€|�/g,
			(matched) => secMapObj[matched]
		);
		req.body = secondPass;
		req.results.windows_1252 = 'Fixed';
		next();
	};
};

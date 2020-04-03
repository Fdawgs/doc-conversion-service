const fs = require('fs');
const httpMocks = require('node-mocks-http');
const fixWin1252ArtifactsMiddleware = require('./win1252-artifacts.middleware');

const artifacts = /â‚¬|â€š|Æ’|â€ž|â€¦|â€¡|Ë†|â€°|â€¹|Å½|â€˜|â€™|â€œ|â€¢|â€“|â€”|Ëœ|Å¡|Å¾|Å¸|Â¯|Â·|Â´|Â°|Ã‚|ï‚·|âˆš|�|Ã€|Ãƒ|Ã„|Ã…|Ã†|Ã‡|Ãˆ|Ã‰|ÃŠ|Ã‹|ÃŒ|ÃŽ|Ã‘|Ã’|Ã“|Ã”|Ã•|Ã–|Ã—|Ã˜|Ã™|Ãš|Ã›|Ãœ|Ãž|ÃŸ|Ã¡|Ã¢|Ã£|Ã¤|Ã¥|Ã¦|Ã§|Ã¨|Ã©|Ãª|Ã«|Ã¬|Ã­|Ã®|Ã¯|Ã°|Ã±|Ã²|Ã³|Ã´|Ãµ|Ã¶|Ã·|Ã¸|Ã¹|Ãº|Ã»|Ã¼|Ã½|Ã¾|Ã¿|â‰¤|â‰¥|Â|Ã|â€|�/g;

describe('Win 1252 Artifact middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = fixWin1252ArtifactsMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should remove win1252 artifacts', () => {
		const middleware = fixWin1252ArtifactsMiddleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			),
			results: {}
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);
		expect(req.results.windows_1252).toBe('Fixed');
		expect(req.body).not.toEqual(expect.stringMatching(artifacts));
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should build req.results if not defined', () => {
		const middleware = fixWin1252ArtifactsMiddleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			)
		};
		const res = httpMocks.createResponse();
		const next = jest.fn();

		middleware(req, res, next);
		expect(typeof req.results).toBe('object');
		expect(next).toHaveBeenCalledTimes(1);
	});
});

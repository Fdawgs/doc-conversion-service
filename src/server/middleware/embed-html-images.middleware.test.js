const fs = require('fs');
const embedHtmlImagesMiddleware = require('./embed-html-images.middleware');

describe('Embed HTML Images middleware', () => {
	test('Should return a middleware function', () => {
		const middleware = embedHtmlImagesMiddleware();
		expect(typeof middleware).toBe('function');
	});

	test('Should embed images into HTML', async () => {
		const middleware = embedHtmlImagesMiddleware('./test_files/', true);
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			),
			results: {}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.results.embedded_images).toBe('Fixed');
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should throw error if temp directory not defined', async () => {
		const middleware = embedHtmlImagesMiddleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			),
			results: {}
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(req.results.embedded_images).not.toBe('Fixed');
		expect(next).toHaveBeenCalledTimes(1);
	});

	test('Should build req.results if not defined', async () => {
		const middleware = embedHtmlImagesMiddleware();
		const req = {
			body: fs.readFileSync(
				'./test_files/tester_bullet_issues-html.html',
				{ encoding: 'UTF-8' }
			)
		};
		const res = {};
		const next = jest.fn();

		await middleware(req, res, next);
		expect(typeof req.results).toBe('object');
		expect(next).toHaveBeenCalledTimes(1);
	});
});

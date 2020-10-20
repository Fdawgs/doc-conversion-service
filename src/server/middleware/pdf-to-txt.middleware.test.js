const cloneDeep = require('lodash/cloneDeep');
const fs = require('fs');
const httpMocks = require('node-mocks-http');
const isHtml = require('is-html');
const os = require('os');
const Middleware = require('./pdf-to-txt.middleware');

const platform = os.platform();
const { serverConfig } = require('../../config');

describe('PDF-to-TXT conversion middleware', () => {
	const modServerConfig = cloneDeep(serverConfig);
	modServerConfig.routes.txt.poppler.tempDirectory = './src/server/temp2/';

	afterAll(() => {
		fs.rmdir(
			modServerConfig.routes.txt.poppler.tempDirectory,
			{ recursive: true },
			() => {}
		);
	});

	test('Should return a middleware function', () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe('function');
	});

	if (platform === 'win32') {
		test('Should convert PDF file to TXT and place in specified directory', async () => {
			const middleware = Middleware(modServerConfig.routes.txt.poppler);
			const req = httpMocks.createRequest({
				body: fs.readFileSync(
					'./test_files/pdf_1.3_NHS_Constitution.pdf'
				),
				headers: {
					'content-type': 'application/pdf'
				}
			});
			const res = httpMocks.createResponse({ locals: { results: {} } });
			const next = jest.fn();

			await middleware(req, res, next);

			expect(typeof res.locals.body).toBe('string');
			expect(isHtml(res.locals.body)).toBe(false);
			expect(typeof res.locals.doclocation).toBe('object');
			expect(next).toHaveBeenCalledTimes(1);
			expect(next.mock.calls[0][0]).toBeUndefined();
			expect(
				fs.existsSync(modServerConfig.routes.txt.poppler.tempDirectory)
			).toBe(true);
		});
	}

	test('Should pass an error to next if PDF file missing', async () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest({
			headers: {
				'content-type': 'application/pdf'
			}
		});
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.locals.body).toBeUndefined();
		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe(
			'Failed to convert PDF file to TXT'
		);
	});
});

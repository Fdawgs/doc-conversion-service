const cloneDeep = require("lodash/cloneDeep");
const fs = require("fs");
const httpMocks = require("node-mocks-http");
const isHtml = require("is-html");
const Middleware = require("./rtf-to-html.middleware");

const { serverConfig } = require("../../config");

describe("RTF-to-HTML conversion middleware", () => {
	const modServerConfig = cloneDeep(serverConfig);
	modServerConfig.routes.html.unrtf.tempDirectory = "./src/server/temp3/";

	afterAll(() => {
		fs.rmdir(
			modServerConfig.routes.html.unrtf.tempDirectory,
			{ recursive: true },
			() => {}
		);
	});

	test("Should return a middleware function", () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe("function");
	});

	test("Should convert RTF file to HTML and place in specified directory", async () => {
		const middleware = Middleware(modServerConfig.routes.html.unrtf);
		const req = httpMocks.createRequest({
			body: fs.readFileSync("./test_files/test-rtf.rtf"),
			headers: {
				"content-type": "application/rtf",
			},
		});
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(typeof res.locals.body).toBe("string");
		expect(isHtml(res.locals.body)).toBe(true);
		expect(typeof res.locals.doclocation).toBe("object");
		expect(fs.existsSync(res.locals.doclocation.rtf)).toBe(true);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
		expect(
			fs.existsSync(modServerConfig.routes.html.unrtf.tempDirectory)
		).toBe(true);
	});

	test("Should pass an error to next if RTF file missing", async () => {
		const middleware = Middleware(modServerConfig.routes.html.unrtf);
		const req = httpMocks.createRequest({
			headers: {
				"content-type": "application/rtf",
			},
		});
		const res = httpMocks.createResponse({ locals: { results: {} } });
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe(
			"Failed to convert RTF file to HTML"
		);
	});
});

const fs = require("fs");
const httpMocks = require("node-mocks-http");
const isHtml = require("is-html");
const Middleware = require("./tidy-css.middleware");

describe("Clean CSS middleware", () => {
	test("Should return a middleware function", () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe("function");
	});

	test("Should clean CSS and change font", () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest({
			query: {
				fonts: "arial",
			},
		});
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync(
					"./test_files/tester_bullet_issues-html.html",
					{ encoding: "UTF-8" }
				),
				results: {},
			},
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(/font-family: arial/gm.exec(res.locals.body)).not.toBeNull();
		expect(/;}|<!--|-->/gm.exec(res.locals.body)).toBeNull();
		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals).toMatchObject({ results: { clean_css: "Fixed" } });
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test("Should clean CSS and change background color", () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest({
			query: {
				backgroundColor: "white",
			},
		});
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync(
					"./test_files/tester_bullet_issues-html.html",
					{ encoding: "UTF-8" }
				),
				results: {},
			},
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(
			/background-color: white/gm.exec(res.locals.body)
		).not.toBeNull();
		expect(/;}|<!--|-->/gm.exec(res.locals.body)).toBeNull();
		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals).toMatchObject({
			body: expect.any(String),
			results: { clean_css: "Fixed" },
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test("Should continue to parse style elements with no type attribute", () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync("./test_files/empty-test-style.html", {
					encoding: "UTF-8",
				}),
				results: {},
			},
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(/;}|<!--|-->/gm.exec(res.locals.body)).toBeNull();
		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals).toMatchObject({
			body: expect.any(String),
			results: { clean_css: "Fixed" },
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test("Should flag file as passed if no issues found", () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync("./test_files/empty-test.html", {
					encoding: "UTF-8",
				}),
				results: {},
			},
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(/;}|<!--|-->/gm.exec(res.locals.body)).toBeNull();
		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals).toMatchObject({
			body: expect.any(String),
			results: { clean_css: "Passed" },
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test("Should build res.locals.results object if not defined", () => {
		const middleware = Middleware();
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse({
			locals: {
				body: fs.readFileSync(
					"./test_files/tester_bullet_issues-html.html",
					{ encoding: "UTF-8" }
				),
			},
		});
		const next = jest.fn();

		middleware(req, res, next);

		expect(/;}|<!--|-->/gm.exec(res.locals.body)).toBeNull();
		expect(isHtml(res.locals.body)).toBe(true);
		expect(res.locals).toMatchObject({
			body: expect.any(String),
			results: { clean_css: "Fixed" },
		});
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});
});

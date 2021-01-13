const fs = require("fs");
const httpMocks = require("node-mocks-http");
const Middleware = require("./validate-file-type.middleware");

describe("File type validation middleware", () => {
	test("Should return a middleware function", () => {
		const middleware = Middleware();

		expect(typeof middleware).toBe("function");
	});

	test("Should validate accepted MIME type", async () => {
		const middleware = Middleware(["application/pdf"]);
		const req = httpMocks.createRequest({
			body: fs.readFileSync("./test_files/pdf_1.3_NHS_Constitution.pdf"),
			headers: {
				"content-type": "application/pdf",
			},
		});
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);

		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0]).toBeUndefined();
	});

	test("Should pass an error to next if file does not have an accepted MIME type", async () => {
		const middleware = Middleware(["application/pdf"]);
		const req = httpMocks.createRequest({
			body: fs.readFileSync("./test_files/test-rtf.rtf"),
			headers: {
				"content-type": "application/pdf",
			},
		});
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe("File type not accepted");
	});

	test("Should pass an error to next if file missing", async () => {
		const middleware = Middleware(["application/pdf"]);
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();
		const next = jest.fn();

		await middleware(req, res, next);

		expect(res.statusCode).toBe(400);
		expect(next).toHaveBeenCalledTimes(1);
		expect(next.mock.calls[0][0].message).toBe("File type not accepted");
	});
});

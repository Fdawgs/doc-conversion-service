const Util = require("./image-to-txt.utils");

describe("Image-to-TXT utility", () => {
	test("Should read text from image file", async () => {
		const test = await Util(
			"./test_files/tester_bullet_issues001.png",
			"eng"
		);

		expect(typeof test).toBe("string");
		expect(test.substring(0, 24)).toBe("Yeovil District Hospital");
	});

	test("Should return error if file missing", async () => {
		await Util().catch((err) => {
			expect(typeof err).toBe("object");
			expect(err.message).toMatch("Cannot convert image");
		});
	});
});

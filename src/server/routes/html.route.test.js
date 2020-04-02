const fs = require('fs');
const request = require('supertest');
const { serverConfig } = require('../../config');
const Server = require('../server');

describe('HTML Route', () => {
	serverConfig.https = false;

	beforeAll(() => {
		jest.setTimeout(20000);
	});

	test('Should return error response if routing config missing', async () => {
		const modServerConfig = { ...serverConfig };
		modServerConfig.port = 8315;
		const path = `http://127.0.0.1:${modServerConfig.port}/api/converter/html`;

		// Stand up server
		const server = new Server(modServerConfig)
			.configurePassport()
			.configureRoutes()
			.configureErrorHandling()
			.listen();

		fs.readFile(
			'./test_files/pdf_1.3_NHS_Constitution.pdf',
			async (err, data) => {
				const pdf = Buffer.from(data).toString('binary');

				await request(path)
					.post('')
					.set('Accept', '*/*')
					.set('Authorization', 'Bearer Jimmini')
					.set('Content-Type', 'application/pdf')
					.send(pdf)
					.then(async (res) => {
						expect(res.statusCode).toBe(200);
						
						// console.log(res.body);
						// expect(typeof res.body).toBe('string');
						await server.shutdown();
					});				
			}
		);
	});
});

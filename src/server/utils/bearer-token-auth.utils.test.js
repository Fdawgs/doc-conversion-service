const Util = require('./bearer-token-auth.utils');

const authKeys = [
	{
		value: 'Jimmini'
	},
	{
		value: 'Cricket'
	}
];

// eslint-disable-next-line no-unused-vars
const mockCallback = jest.fn((error, user, options) => {});

describe('Passport bearer token authorization utility function', () => {
	test('Should populate user arg of callback', () => {
		Util('Jimmini', mockCallback, authKeys);

		expect(mockCallback.mock.calls.length).toBe(1);
		expect(mockCallback.mock.calls[0][0]).toBeNull();
		expect(mockCallback.mock.calls[0][1]).toBe('Jimmini');
	});

	test('Should fail to populate user arg of callback', () => {
		Util('Pinocchio', mockCallback, authKeys);

		expect(mockCallback.mock.calls.length).toBe(1);
		expect(mockCallback.mock.calls[0][0]).toBeNull();
		expect(mockCallback.mock.calls[0][1]).toBe(false);
	});
});

module.exports = {
	testMatch: ["**/tests/**/*.test.ts"],
	transform: {
		"\\.ts$": "@swc/jest",
	},
	testTimeout: 150000,
};

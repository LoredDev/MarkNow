import { defineProject } from 'vitest/config';

export default defineProject({
	test: {
		environmentMatchGlobs: [
			['**\/*{,.node}.test.{js,ts}', 'node'],
		],
		include: ['./tests/**/*.test.js'],
	},
});

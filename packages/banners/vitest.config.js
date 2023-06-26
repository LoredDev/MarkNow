import { defineProject } from 'vitest/config';

export default defineProject({
	test: {
		environmentMatchGlobs: [
			['**\/*{,.node}.test.{js,ts}', 'node'],
			['**\/*.edge.test.{js,ts}', 'edge-runtime'],
		],
		include: ['./tests/**/*.test.js'],
	},
});

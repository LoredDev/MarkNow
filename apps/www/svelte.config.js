import adapter from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import rhExternalLinks from 'rehype-external-links';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [sveltePreprocess(), mdsvex({
		rehypePlugins: [
			[rhExternalLinks, {
				target: '_blank',
				rel: ['nofollow', 'noopener', 'noreferrer'],
			}],
		],
		extensions: ['.svx', '.md'],
	})],
	kit: {
		adapter: adapter(),
	},
};

export default config;

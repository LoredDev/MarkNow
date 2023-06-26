import { describe, expect, it } from 'vitest';
import type { BannerOptions } from '../src/index';
import banner from '../src/index';

describe('Complex banner', async () => {
	const options: BannerOptions = {
		title: '@marknow/banners',
		subtitle: 'This is a more complex banner that uses most of the package settings',
		icon: 'solar:inbox-unread-bold-duotone',
		colors: {
			foreground: '#feefec',
			background: '#1d1412',
		},
		fonts: {
			title: {
				// eslint-disable-next-line spellcheck/spell-checker
				name: 'Quattrocento',
				data: await (await fetch('https://fonts.bunny.net/quattrocento/files/quattrocento-latin-700-normal.woff')).arrayBuffer(),
				weight: 700,
				style: 'normal',
			},
			subtitle: {
				// eslint-disable-next-line spellcheck/spell-checker
				name: 'Quattrocento Sans',
				data: await (await fetch('https://fonts.bunny.net/quattrocento-sans/files/quattrocento-sans-latin-400-normal.woff')).arrayBuffer(),
				weight: 400,
				style: 'normal',
			},
		},
		libConfig: {
			fetcher: globalThis.fetch,
		},
	};

	it('Horizontal', async () => {
		const result = await banner({
			...options,
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/banner-horizontal.svg');
	});

	it('Horizontal RTL', async () => {
		const result = await banner({
			...options,
			rtl: true,
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/banner-rtl.svg');
	});

	it('Vertical', async () => {
		const result = await banner({
			...options,
			layout: 'vertical',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/banner-vertical.svg');
	});
});

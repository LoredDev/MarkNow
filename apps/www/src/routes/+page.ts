import type { BannerOptions } from '@marknow/banners';
import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
	const fonts: BannerOptions['fonts'] = {
		title: {
			data: await (await fetch('/Mona-Sans-SemiBold.woff')).arrayBuffer(),
			name: 'Mona Sans',
			weight: 600,
		},
		subtitle: {
			data: await (await fetch('/Mona-Sans-Regular.woff')).arrayBuffer(),
			name: 'Mona Sans',
			weight: 400,
		},
	};

	return { banner: { fonts } };
}) satisfies PageLoad;

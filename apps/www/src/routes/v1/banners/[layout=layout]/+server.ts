import type { BannerOptions } from '@marknow/banners';
import createBanner from '@marknow/banners';
import { type RequestHandler, error } from '@sveltejs/kit';

export const GET = (async ({ params, url, fetch }) => {
	const title: string | null = url.searchParams.get('title');
	if (!title)
		throw error(400, { message: 'Please provide a title parameter for the banner' });

	const layout = <BannerOptions['layout']>params.layout?.replace('.svg', '');
	const subtitle: string | undefined = url.searchParams.get('subtitle') ?? undefined;
	const icon: string | undefined = url.searchParams.get('icon') ?? undefined;
	const rtl: boolean = url.searchParams.get('rtl') !== 'false' && url.searchParams.get('rtl') !== null;

	const colors: BannerOptions['colors'] = {
		foreground: `#${url.searchParams.get('foreground') ?? '000000'}`,
		background: `#${url.searchParams.get('background') ?? 'ffffff'}`,
	};

	const banner = await createBanner({
		title,
		layout,
		subtitle,
		icon,
		rtl,
		colors,
		fonts: {
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
		},
		libConfig: {
			fetcher: fetch,
		},
	});

	return new Response(banner.svg, {
		headers: {
			'Content-type': 'image/svg+xml',
		},
		status: 200,
	});
}) satisfies RequestHandler;

import type { RequestHandler } from '@sveltejs/kit';
import newBanner from '@marknow/banners';

export const GET = (async ({ fetch }): Promise<Response> => {
	const banner = await newBanner({
		title: 'Hello world',
		subtitle: 'This is a test!',
		font: {
			title: {
				data: await (await fetch('/Mona-Sans-SemiBold.woff')).arrayBuffer(),
				name: 'Mona Sans',
				weight: 600,
				style: 'normal',
			},
			subtitle: {
				data: await (await fetch('/Mona-Sans-Regular.woff')).arrayBuffer(),
				name: 'Mona Sans',
				weight: 400,
				style: 'normal',
			},
		},
	});

	return new Response(`${banner.toString()}`, {
		status: 200,
		headers: {
			'Content-type': 'image/svg+xml',
		},
	});
}) satisfies RequestHandler;

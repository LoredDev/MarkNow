import type { RequestHandler } from '@sveltejs/kit';
import newBanner from '@marknow/banners';

export const GET = (async (): Promise<Response> => {
	const banner = await newBanner({
		title: 'Hello world',
	});

	return new Response(`${banner.toString()}`, {
		status: 200,
		headers: {
			'Content-type': 'image/svg+xml',
		},
	});
}) satisfies RequestHandler;

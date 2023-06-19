import type { RequestHandler } from '@sveltejs/kit';
import satori from 'satori';
import { html as satoriHtml } from 'satori-html';
import Banner from './Banner.html?raw';
import font400 from '$lib/assets/Mona-Sans-Regular.woff?url';
import font600 from '$lib/assets/Mona-Sans-SemiBold.woff?url';

export const GET = (async ({ fetch }): Promise<Response> => {
	const html = satoriHtml(Banner);

	const banner = await satori(html,
		{
			width: 650,
			height: 180,
			fonts: [
				{
					name: 'Mona Sans',
					weight: 400,
					style: 'normal',
					data: await (await fetch(font400)).arrayBuffer(),
				},
				{
					name: 'Mona Sans',
					weight: 600,
					style: 'normal',
					data: await (await fetch(font600)).arrayBuffer(),
				}],
		});

	return new Response(banner, {
		status: 200,
		headers: {
			'Content-type': 'image/svg+xml',
		},
	});
}) satisfies RequestHandler;

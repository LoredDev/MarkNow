import type { PageLoad } from './$types';

export const load = (async ({ fetch }): Promise<{ banner: string }> => {
	const banner = await (await fetch('/api.svg')).text();
	return { banner };
}) satisfies PageLoad;

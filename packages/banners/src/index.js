import { html as htmlToVNodes } from 'satori-html';
import satori from 'satori';
import { generateBannerHtml } from './html';
import { getMonaSansFonts } from './fonts';

/**
 * @param {import('./types').BannerOptions} options
 * @returns {Promise<import('./types').Banner>}
 */
export default async function banner({
	title,
	subtitle = '',
	layout = 'horizontal',
	config,
}) {
	const dimensions = {
		width: 1000,
		height: layout === 'horizontal' ? 180 : 680,
	};

	const bannerFonts = await getMonaSansFonts(config?.reader);

	const html = generateBannerHtml(layout, dimensions)
		.replace('%%MARKNOW-PLACEHOLDER-TITLE%%', title)
		.replace('%%MARKNOW-PLACEHOLDER-SUBTILE%%', subtitle);

	const vNodes = htmlToVNodes(html);

	const svg = await satori(vNodes, {
		...dimensions,
		fonts: [
			bannerFonts.bold,
			bannerFonts.regular,
		],
	});

	return {
		html,
		vNodes,
		svg,
		toString() { return svg; },
	};
}

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
	if (layout === 'horizontal') {
		title = truncateText(title, 45);
		subtitle = truncateText(subtitle, 100);
	}
	else {
		title = truncateText(title, 90);
		subtitle = truncateText(subtitle, 200);
	}

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

/** @type {(string: string, maxChar: number) => string} */
function truncateText(string, maxChar) {
	return string.length > maxChar ? `${string.slice(0, maxChar)}...` : string;
}

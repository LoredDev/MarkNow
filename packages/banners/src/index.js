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
	colors = {
		background: '#ffffff',
		foreground: '#000000',
	},
	layout = 'horizontal',
	font: customFonts,
	rtl = false,
	libConfig: config,
}) {
	const dimensions = {
		width: 1000,
		height: 180,
	};

	if (layout === 'horizontal') {
		title = truncateText(title, 45);
		subtitle = truncateText(subtitle, 100);
	}
	else {
		title = truncateText(title, 90);
		subtitle = truncateText(subtitle, 200);
		dimensions.height = 680;
	}

	const bannerFonts = customFonts ?? await getMonaSansFonts(config?.reader);

	const htmlTemplate = generateBannerHtml({ layout, dimensions, fonts: bannerFonts, colors, rtl });

	const html = htmlTemplate
		.replace('%%MARKNOW-PLACEHOLDER-TITLE%%', title)
		.replace('%%MARKNOW-PLACEHOLDER-SUBTILE%%', subtitle);

	const vNodes = htmlToVNodes(html);

	const svg = await satori(vNodes, {
		...dimensions,
		fonts: [
			bannerFonts.title,
			bannerFonts.subtitle,
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

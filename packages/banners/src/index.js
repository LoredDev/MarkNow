import { html as htmlToVNodes } from 'satori-html';
import satori from 'satori';
import { generateBannerHtml } from './html';
import { getMonaSansFonts } from './fonts';
import { getIcon } from './icons';

/**
 * @param {import('./types').BannerOptions} options
 * @returns {Promise<import('./types').Banner>}
 */
export default async function banner({
	title,
	subtitle = '',
	icon = '',
	layout = 'horizontal',
	colors = {
		background: '#ffffff',
		foreground: '#000000',
	},
	libConfig: config = {},
	font: customFonts,
	rtl = false,
}) {
	config.iconHandler ||= icon => getIcon(icon, config?.fetcher);

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
		dimensions.height = 1300;
	}

	const bannerFonts = customFonts ?? await getMonaSansFonts(config?.reader);

	const htmlTemplate = generateBannerHtml({ layout, dimensions, fonts: bannerFonts, colors, rtl });

	const iconSvg = await config.iconHandler(icon);

	const html = htmlTemplate
		.replace('%%MARKNOW-PLACEHOLDER-TITLE%%', title)
		.replace('%%MARKNOW-PLACEHOLDER-SUBTILE%%', subtitle)
		.replace('%%MARKNOW-PLACEHOLDER-ICON%%', iconSvg);

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
		icon: iconSvg,
		toString() { return svg; },
	};
}

/** @type {(string: string, maxChar: number) => string} */
function truncateText(string, maxChar) {
	return string.length > maxChar ? `${string.slice(0, maxChar)}...` : string;
}

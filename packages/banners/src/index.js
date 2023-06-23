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
	fonts,
	rtl = false,
}) {
	config.iconHandler ||= icon => getIcon(icon, config?.fetcher);
	fonts ||= await getMonaSansFonts(config?.reader);
	title = truncateText(title, layout === 'horizontal' ? 45 : 90);
	subtitle = truncateText(subtitle, layout === 'horizontal' ? 100 : 200);

	const dimensions = {
		width: 1000,
		height: layout === 'horizontal' ? 180 : 1300,
	};

	const htmlTemplate = generateBannerHtml({ layout, dimensions, fonts, colors, rtl });

	const iconSvg = await config.iconHandler(icon);

	const html = htmlTemplate
		.replace('%%MARKNOW-PLACEHOLDER-TITLE%%', title)
		.replace('%%MARKNOW-PLACEHOLDER-SUBTILE%%', subtitle)
		.replace('%%MARKNOW-PLACEHOLDER-ICON%%', iconSvg);

	const vNodes = htmlToVNodes(html);

	const svg = await satori(vNodes, {
		...dimensions,
		fonts: [
			fonts.title,
			fonts.subtitle,
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

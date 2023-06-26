import { html as htmlToVNodes } from 'satori-html';
import satori from 'satori';
import bannerHtml from './html';
import { getMonaSansFonts } from './fonts';
import { getIcon, setIconDimensions } from './icons';

/**
 * @param {import('./types').BannerOptions} options
 * @returns {Promise<import('./types').Banner>}
 */
export default async function banner({
	title,
	fonts,
	icon = '',
	rtl = false,
	subtitle = '',
	layout = 'horizontal',
	libConfig: config = {},
	colors = {
		background: '#ffffff',
		foreground: '#000000',
	},
}) {
	fonts ||= await getMonaSansFonts(config?.reader);
	config.iconHandler ||= icon => getIcon(icon, config?.fetcher);

	title = truncateText(title, layout === 'horizontal' ? 45 : 90);
	subtitle = truncateText(subtitle, layout === 'horizontal' ? 100 : 200);

	const dimensions = {
		width: 1000,
		height: layout === 'horizontal' ? 180 : 1300,
	};

	const htmlTemplate = bannerHtml({ layout, dimensions, fonts, colors, rtl });

	const iconSvg = setIconDimensions(await config.iconHandler(icon), { width: '3.5em' });

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
		toString() { return svg; },
		icon: iconSvg,
		vNodes,
		html,
		svg,
	};
}

/** @type {(string: string, maxChar: number) => string} */
function truncateText(string, maxChar) {
	return string.length > maxChar ? `${string.slice(0, maxChar)}...` : string;
}

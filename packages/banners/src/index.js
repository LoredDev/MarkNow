/**
 * @file
 * Main entry point of the `@marknow/banners` package. This file contains
 * all ESModules exports of the public APIs and functions of the library.
 * Anything exported here should have an @access public access level and
 * declared on {@link ./index.d.ts types declaration} file.
 *
 * @author
 * Guz013 (under the Lored organization) <https://github.com/LoredDev>
 *
 * @copyright
 * Gustavo "Guz013" L. de Mello
 *
 * @module \@marknow/banners
 *
 * @license
 * MIT OR Apache-2.0
 */
import { html as htmlToVNodes } from 'satori-html';
import satori from 'satori';
import bannerHtml from './html';
import { getMonaSansFonts } from './fonts';
import { getIcon, setIconDimensions } from './icons';

/**
 * The banner constructor function. Use the options to customize the
 * appearance of the resulting banner.
 *
 * @param {import('./types').BannerOptions} options
 * Options object for customizing the banner appearance.
 *
 * @returns {Promise<import('./types').Banner>}
 *
 * @example
 * import newBanner from '@marknow/banners';
 *
 * export async function GET({ fetch }) {
 *   const banner = await newBanner({
 *     title: 'Hello world',
 *     subtitle: 'This is a example api endpoint.'
 *     icon: 'material-symbols:api'
 *     fonts: {
 *       title: {
 *         data: await (await fetch('/Mona-Sans-SemiBold.woff')).arrayBuffer(),
 *         name: 'Mona Sans',
 *         weight: 600,
 *       },
 *       subtitle: {
 *         data: await (await fetch('/Mona-Sans-Regular.woff')).arrayBuffer(),
 *         name: 'Mona Sans',
 *         weight: 400,
 *       },
 *     },
 *     libConfig: {
 *       fetcher: fetch,
 *     },
 *   });
 *
 *   return new Response(banner.toString(), {
 *     status: 200,
 *     headers: {
 *       'Content-type': 'image/svg+xml',
 *     },
 *   });
 * }
 *
 * @module \@marknow/banners
 * @access public
 */
export async function banner({
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
		height: layout === 'horizontal' ? 180 : 280,
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

/**
 * Small utility function used to truncate long texts on the banner
 *
 * @param {string} string - Text string to be truncated.
 * @param {number} maxChar - Maximum number of characters.
 *
 * @returns {string}
 *
 * @module \@marknow/banners
 * @access package
 */
function truncateText(string, maxChar) {
	return string.length > maxChar ? `${string.slice(0, maxChar)}...` : string;
}

export { bannerHtml, getIcon, setIconDimensions, banner as default, truncateText };

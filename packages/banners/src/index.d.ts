/**
 * @file
 * This file contains all public functions and types declaration of the
 * `@marknow/banners` package. Anything declared here can be accessed directly
 * by the library consumers and has an @access public access level.
 *
 * The JSDocs of the functions are duplicated from the source files, so that
 * it is more compatible with Typescript syntax and code documentation.
 *
 * @author
 * Guz013 (under the Lored organization) <https://github.com/LoredDev>
 *
 * @copyright
 * Gustavo "Guz013" L. de Mello
 *
 * @module \@marknow/banners
 *
 * @lincese
 * MIT OR Apache-2.0
 */

import type { BannerOptions, Colors, Fetcher, Font } from './types'

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
export default function banner(options: BannerOptions): Promise<import('./types').Banner>;

/**
 * Constructor of the HTML banner converted to VNodes to be used in satori.
 * Use the properties to customize and complete it.
 *
 * @typedef {{
*   dimensions: { width: number, height: number },
*   fonts: { title: Font, subtitle: Font },
*   layout: 'vertical' | 'horizontal',
*   colors: Colors,
*   rtl: boolean,
* }} Props
* @param {Props} properties
* Properties to be applied on the html.
*
* @returns {string}
*
* @module \@marknow/banners
* @access public
*/
export function bannerHtml(properties: {
	dimensions: { width: number, height: number },
	layout: 'vertical' | 'horizontal'
	fonts: { title: Font, subtitle: Font },
	layout: 'vertical' | 'horizontal',
	colors: Colors,
	rtl: boolean,
}): string;

/**
 * Utility function used to get a SVG icon from Iconify OR from an url passed as the icon.
 *
 * If the `icon` parameter is not a valid icon name or url,
 * it returns the `icon` itself.
 *
 * @param {string} icon
 * The icon's name or url endpoint.
 *
 * @param {import('./types').Fetcher | undefined} [fetcher=globalThis.fetch]
 * Fetch function to be used.
 *
 * @returns {Promise<string>}
 *
 * @module \@marknow/banners
 * @access public
 */
export function getIcon(icon: string, fetcher?: Fetcher): Promise<string>

/**
 * Utility function used to set the icons SVG width and height to the specified dimensions.
 *
 * @param {string} svg
 * The svg string.
 *
 * @param {{width?: string | number, height?: string | number}} dimensions
 * The dimensions values, if type number it is converted to pixels.
 *
 * @returns {string}
 *
 * @module \@marknow/banners
 * @access protected
 */
export function setIconDimensions(
	svg: string,
	dimensions: {
		width?: string | number,
		height?: string | number
	}
): string

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
export function truncateText(string: string, maxChar: number): string;

export type { BannerOptions, Banner };

/**

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
export default function banner({ title, subtitle, icon, layout, config, }: import('./types').BannerOptions): Promise<import('./types').Banner>;

export type { BannerOptions, Banner } from './types'

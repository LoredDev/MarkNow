/**
 * @file
 * Definitions of more complex or shared Typescript types used in the package.
 *
 * @author
 * Guz013 (under the Lored organization) <https://github.com/LoredDev>
 *
 * @copyright
 * Gustavo "Guz013" L. de Mello
 *
 * @module \@marknow/banners
 */

import type { OpenMode, PathLike } from "node:fs";
import type { FileHandle } from "node:fs/promises";
import type { SatoriOptions } from "satori/wasm";

/**
 * Options object for customizing the banner appearance.
 *
 * @module \@marknow/banners
 * @access public
 */
export interface BannerOptions {
	/**
	 * **(REQUIRED)** Title to be displayed in the banner.
	 */
	title: string,

	/**
	 * (Optional) Set the text direction right-to-left.
	 */
	rtl?: boolean = false,

	/**
	 * (Optional) {@link https://iconify.design/ Iconify}/{@link https://icones.js.org/ Icônes}-like
	 * icon name OR url for svg file of the icon to be used in the banner.
	 */
	icon?: string = '',

	/**
	 * (Optional) Subtitle/legend to be displayed in the banner
	 * bellow the title.
	 */
	subtitle?: string = '',

	/**
	 * (Optional) Customize the colors of the banner.
	 *
	 * Customize the background color and foreground (title, subtitle
	 * and icon) colors.
	 */
	colors?: Colors = { background: '#ffffff', foreground: '#000000' },

	/**
	 * (Optional) Customize the layout of the banner and position of elements.
	 */
	layout?: 'horizontal' | 'vertical' = 'horizontal',

	/**
	 * (Optional) Customize the fonts used on the banner.
	 *
	 * Changes the default font file used for the title and subtitle.
	 * Defaults is {@link https://github.com/github/mona-sans Github's Mona Sans}
	 * semi-bold and regular respectively.
	 *
	 * @see {@link https://github.com/vercel/satori#fonts}
	 */
	fonts?: {
		title: Font,
		subtitle: Font,
	}

	/**
	 * (Optional) Customize the behavior of the package.
	 *
	 * Provide functions or polyfills to be used by the package
	 * for better compatibility or customization of the banner
	 * creation.
	 */
	libConfig?: {
		/**
		 * (Optional) Fetch function used by the package to retrieve
		 * icons from {@link https://iconify.design/ Iconify} and custom
		 * icons provided as url.
		 *
		 * Default function used is the
		 * {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch globalThis.fetch}
		 * function. Compatible with modern browsers, Node.js (version 18 and greater),
		 * Deno and Bun.
		 *
		 * @see {@link BannerOptions.icon}
		 *
		 * @param {RequestInfo} input - The request url/info.
		 * @param {RequestInit} - Request options.
		 * @returns {Promise<Response>}
		 */
		fetcher?: Fetcher = globalThis.fetch,

		/**
		 * (Optional) The function used to read the font files and return a Buffer or
		 * ArrayBuffer from them.
		 *
		 * Default function used is the {@link https://nodejs.org/api/fs.html#fsreadfilepath-options-callback fs.readFile}
		 * from the Node file system promises api ({@link https://nodejs.org/api/fs.html#file-system node:fs/promises}).
		 * Compatible with Node.js (version 10 and greater), Deno and Bun.
		 *
		 * @param {PathLike | FileHandle} path - The path to the font files.
		 * @returns {Promise<Buffer | ArrayBuffer>}
		 */
		reader?: Reader = import ('node:fs/promises').readFile,

		/**
		 * (Optional) The function used to get the icon svg file from {@link https://iconify.design/ Iconify}
		 * or URL endpoint passed.
		 *
		 * @see {@link BannerOptions.icon}
		 *
		 * @param {string} icon - Icon name or URL.
		 * @returns {string | Promise<string>}
		 */
		iconHandler?: (icon: string) => string | Promise<string>
	}
}

/**
 * The resulting banner object.
 *
 * Has a `toString()` function to be used in string literals
 * that returns the svg string of the banner.
 *
 * @module \@marknow/banners
 * @access public
 */
export interface Banner {
	/**
	 * The resulting svg of the banner.
	 * @readonly
	 */
	svg: string,
	/**
   * The raw html used to create the banner.
   * @readonly
   */
	html: string,
	/**
   * The used icon's svg.
   * @readonly
   */
	icon: string,
	/**
	 * React-element-like objects / VDOM used to create the banner.
	 * @readonly
	 */
	vNodes: VNode,
	/**
	 * Returns the {@link Banner.svg svg string} of the banner.
	 * Useful when using the banner object directly on a string.
	 *
	 * @example
	 * import newBanner from '@marknow/banners';
	 *
	 * const banner = await newBanner({ ... });
	 *
	 * // Prints the resulting svg instead of the banner object itself.
	 * console.log(`Banner svg:\n${banner}`)
	 *
	 * @readonly
	 */
	toString(): string,
};

/**
 * Font object for the banner passed to the `satori` package.
 *
 * @see {@link BannerOptions.fonts}
 * @see {@link https://github.com/vercel/satori#fonts}
 *
 * @module \@marknow/banners > satori
 * @access protected
 */
export type Font = SatoriOptions['fonts'][0];

export type Colors = {
	foreground: string;
	background: string;
}

/**
 * "Global Fetch"-like function used by the package to retrieve
 * icons from [Iconify](https://iconify.design/) and custom
 * icons provided as url.
 *
 * @param {RequestInfo} input - The request url/info.
 * @param {RequestInit} - Request options.
 * @returns {Promise<Response>}
 *
 * @module \@marknow/banners
 * @access protected
 */
export type Fetcher = (
	input: RequestInfo | URL,
	init?: RequestInit
) => Promise<Response>;

/**
 * "Node.js' `fs.readFile`"-like function used to read the font files
 * and return a Buffer or ArrayBuffer from them.
 *
 * @param {RequestInfo} input - The request url/info.
 * @param {RequestInit} - Request options.
 * @returns {Promise<Response>}
 *
 * @module \@marknow/banners
 * @access protected
 */
export type Reader = (
	path: PathLike | FileHandle,
) => Promise<Buffer | ArrayBuffer>

/**
 * React-element-like objects / VDOM object used in satori.
 *
 * @module \@marknow/banners > satori-html
 * @access protected
 */
export interface VNode {
	type: string;
	props: {
		style?: Record<string, any>;
		children?: string | VNode | VNode[];
		[prop: string]: any;
	};
}

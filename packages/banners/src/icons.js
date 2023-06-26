/**
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
 * @access protected
 */
export async function getIcon(icon, fetcher = fetch) {
	if (!isIconName(icon) && !isValidUrl(icon)) {
		return icon;
	}
	else if (isValidUrl(icon)) {
		const svg = (await fetcher(icon)).text();
		return svg;
	}

	const [collection, iconName] = icon.split(':');
	const svg = (await fetcher(`https://api.iconify.design/${collection}/${iconName}.svg`)).text();

	return svg;
}

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
export function setIconDimensions(svg, { width, height }) {
	width = typeof width === 'number'
		? `width="${width}px"`
		: !width
			? ''
			: `width="${width}"`;

	height = typeof height === 'number'
		? `height="${height}px"`
		: !height
			? ''
			: `height="${height}"`;

	return svg
		.replace(/width="([^"]*)"/, width)
		.replace(/height="([^"]*)"/, height);
}

/**
 * Checks if a given string is a valid
 * [Iconify](https://iconify.design/)/[Icônes](https://icones.js.org/)-like icon name.
 *
 * @param {string} string The string to be checked.
 * @returns {boolean}
 *
 * @module \@marknow/banners
 * @access package
 */
function isIconName(string) {
	try {
		const [collection, icon] = string.split(':');
		return Boolean(collection) && Boolean(icon);
	}
	catch (_) {
		return false;
	}
}

/**
 * Checks if string is a valid URL.
 *
 * @param {string} string The string to be checked.
 * @returns {boolean}
 *
 * @module \@marknow/banners
 * @access package
 */
function isValidUrl(string) {
	try {
		const url = new URL(string);
		return url.protocol === 'https:' || url.protocol === 'http:';
	}
	catch (_) {
		return false;
	}
}

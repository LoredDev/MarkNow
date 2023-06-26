/**
 * @param {string} icon
 * @param {import('./types').Fetcher | undefined} fetcher
 *
 * @return {Promise<string>}
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
 * Checks if a given string is a valid [Iconify](https://iconify.design/)/[Icônes](https://icones.js.org/)-like icon name.
 *
 * @param {string} iconName
 * @return {boolean}
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
 * @param {string} string
 * @return {boolean}
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

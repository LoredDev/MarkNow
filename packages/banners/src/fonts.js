/**
 * @file
 * Utility functions used to retrieve and manipulate fonts' objects.
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

/**
 * @param {import('./types').Reader | undefined} [reader=import('node:fs').readFile]
 * The function to be used as reader of the local files.
 *
 * @typedef {import('satori').SatoriOptions['fonts'][0]} Font
 * @returns {Promise<{subtitle: Font, title: Font}>}
 *
 * @module \@marknow/banners
 * @access protected
 */
export async function getMonaSansFonts(reader) {
	const { dirname, join } = await import('node:path');
	const { fileURLToPath } = await import('node:url');
	reader ||= (await import('node:fs/promises')).readFile;

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename);

	return {
		subtitle: {
			name: 'Mona Sans',
			weight: 400,
			style: 'normal',
			data: await reader(join(__dirname, './assets/Mona-Sans-Regular.woff')),
		},
		title: {
			name: 'Mona Sans',
			weight: 600,
			style: 'normal',
			data: await reader(join(__dirname, './assets/Mona-Sans-SemiBold.woff')),
		},
	};
}

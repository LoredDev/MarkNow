import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * @param {import('./types').Reader | undefined} reader
 * @typedef {import('satori').SatoriOptions['fonts'][0]} Font
 * @returns {Promise<{subtitle: Font, title: Font}>}
 */
export async function getMonaSansFonts(reader) {
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

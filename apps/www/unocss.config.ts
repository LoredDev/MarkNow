import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';
import { presetRadix, radixColors } from 'unocss-preset-radix';
import { presetScrollbar } from 'unocss-preset-scrollbar';
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders';
import type { IconifyJSON } from '@iconify/types';

export default defineConfig({
	include: [
		/\.svelte/,
		/\.svelte\?svelte/,
		/\.svx/,
		/\.svx\?svx/,
		/\.md/,
		/\.md\?md/,
	],
	presets: [
		presetUno(),
		presetAttributify(),
		presetScrollbar(),
		presetIcons({
			collections: {
				solar: () => (import('@iconify-json/solar/icons.json').then(i => i.default)) as Promise<IconifyJSON>,
				spinners: () => (import('@iconify-json/svg-spinners/icons.json').then(i => i.default)) as Promise<IconifyJSON>,
				custom: FileSystemIconLoader('./src/lib/assets/icons'),
			},
		}),
		presetWebFonts({
			fonts: {
				sans: {
					name: 'Mona Sans',
					provider: 'none',
				},
				code: {
					name: 'Fira Code',
					provider: 'none',
				},
			},
		}),
		// @ts-expect-error It seems that this preset
		// has an incorrect type definition for this function,
		// even when is works as intended.
		presetRadix({
			palette: [...radixColors],
		}),
	],
	transformers: [
		transformerDirectives(),
		transformerVariantGroup(),
	],
	extractors: [
		extractorSvelte(),
	],
});

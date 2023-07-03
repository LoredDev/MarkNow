import { describe, expect, it } from 'vitest';
import banner from '../src/index';

describe('Iconify icons', async () => {
	it('API\'s Iconify icon', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',

			icon: 'solar:test-tube-minimalistic-bold-duotone',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/icons-withIconifyIcon.svg');
	});

	it('Local Iconify icon', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',
			icon: `
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<g fill="currentColor">
						<path
							d="M3.187 15.049a4.085 4.085 0 0 0 0 5.758a4.042 4.042 0 0 0 5.734 0l3.746-3.762l-1.772-.736a2.356 2.356 0 0 1-1.408-1.906a2.352 2.352 0 0 0-2.074-2.082h-1.51l-2.716 2.728Z" />
						<path fill-rule="evenodd"
							d="M13.363 2.233a.8.8 0 0 1 1.13.003l7.274 7.305a.8.8 0 0 1-1.134 1.129L13.36 3.364a.8.8 0 0 1 .003-1.13Z"
							clip-rule="evenodd" />
						<path d="M14.09 4.098L3.187 15.048a4.085 4.085 0 0 0 0 5.76a4.042 4.042 0 0 0 5.734 0L19.824 9.856l-5.734-5.76Z"
							opacity=".5" />
					</g>
				</svg>
			`.toString(),
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/icons-withIconifyIcon.svg');
	});

	it('URL Iconify icon', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',
			icon: 'https://api.iconify.design/solar:test-tube-minimalistic-bold-duotone.svg',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/icons-withIconifyIcon.svg');
	});
});

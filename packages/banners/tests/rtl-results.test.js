import { describe, expect, it } from 'vitest';
import banner from '../src/index';

describe('Horizontal Layout', async () => {
	it('With Title', async () => {
		const result = await banner({
			title: 'Hello World',
			rtl: true,
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/rtl-withTitle.svg');
	});

	it('With Subtitle', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',
			rtl: true,
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/rtl-withSubtitle.svg');
	});

	it('With Icon', async () => {
		const result = await banner({
			title: 'Hello World',
			icon: 'solar:test-tube-bold-duotone',
			rtl: true,
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/rtl-withIcon.svg');
	});

	it('With Subtitle and Icon', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',
			icon: 'solar:test-tube-bold-duotone',
			rtl: true,
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/rtl-withComplete.svg');
	});
});

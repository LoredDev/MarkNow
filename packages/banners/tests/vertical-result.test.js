import { describe, expect, it } from 'vitest';
import banner from '../src/index';

describe('Vertical Layout', async () => {
	it('With Title', async () => {
		const result = await banner({
			title: 'Hello World',
			layout: 'vertical',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/vertical-withTitle.svg');
	});

	it('With Subtitle', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',
			layout: 'vertical',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/vertical-withSubtitle.svg');
	});

	it('With Icon', async () => {
		const result = await banner({
			title: 'Hello World',
			icon: 'solar:test-tube-bold-duotone',
			layout: 'vertical',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/vertical-withIcon.svg');
	});

	it('With Subtitle and Icon', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',
			icon: 'solar:test-tube-bold-duotone',
			layout: 'vertical',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/vertical-withComplete.svg');
	});
});

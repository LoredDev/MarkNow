import { describe, expect, it } from 'vitest';
import banner from '../src/index';

describe('Horizontal Layout', async () => {
	it('With Title', async () => {
		const result = await banner({
			title: 'Hello World',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/withTitle.svg');
	});

	it('With Subtitle', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/withSubtitle.svg');
	});

	it('With Icon', async () => {
		const result = await banner({
			title: 'Hello World',
			icon: 'solar:test-tube-bold-duotone',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/withIcon.svg');
	});

	it('With Subtitle and Icon', async () => {
		const result = await banner({
			title: 'Hello World',
			subtitle: 'This is a test',
			icon: 'solar:test-tube-bold-duotone',
		});
		expect(result.toString()).toMatchFileSnapshot('./__snapshots__/withComplete.svg');
	});
});

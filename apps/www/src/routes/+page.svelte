<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	let title = 'Hello World';
	let subtitle = 'Welcome to marknow';
	let iconName = 'solar:book-bookmark-minimalistic-bold';
	let foreground = '#000000';
	let background = '#ffffff';
	let isVertical = false;
	let isRtl = false;

	const id = writable(Math.random());

	let copied = false;

	$: url = new URL(
		`${$page.url.protocol}//${$page.url.host}/v1/banners/${
			isVertical ? 'vertical' : 'horizontal'
		}.svg?title=${title}${subtitle ? `&subtitle=${subtitle}` : ''}${
			iconName ? `&icon=${iconName}` : ''
		}${
			foreground !== '#000000'
				? `&foreground=${foreground.replace('#', '')}`
				: ''
		}${
			background !== '#ffffff'
				? `&background=${background.replace('#', '')}`
				: ''
		}${isRtl ? '&rtl=true' : ''}`,
	);
</script>

<div un-h="sm" un-flex="~">
	<section un-flex="~ col" un-m="r-5" un-w="20em" un-max-w="20em">
		<div un-flex="~ col">
			<label un-text="sm" for="title-input">Title</label>
			<textarea
				type="text"
				name="title text"
				id="title-input"
				un-p="2"
				un-font="bold"
				un-min-h="1em"
				un-max-h="5em"
				un-resize-y
				un-outline="0"
				bind:value={title}
				on:input={() => ($id = Math.random())}
			/>
		</div>
		<div un-m="t-3" un-flex="~ col">
			<label un-text="sm" for="subtitle-input">Subtitle</label>
			<textarea
				type="text"
				name="subtitle text"
				id="subtitle-input"
				un-p="2"
				un-font="bold"
				un-min-h="4em"
				un-max-h="9em"
				un-resize-y
				un-outline="0"
				bind:value={subtitle}
				on:input={() => ($id = Math.random())}
			/>
		</div>
		<div un-m="t-3" un-flex="~ col">
			<label un-text="sm" for="icon-input">Iconify Icon</label>
			<input
				type="text"
				name="icon name"
				id="icon-input"
				un-p="2"
				un-font="bold"
				un-outline="0"
				bind:value={iconName}
				on:input={() => ($id = Math.random())}
			/>
		</div>
		<div un-m="t-3">
			<input
				type="color"
				class="p-0 w-1.5em h-1.5em b-0 rounded-md bg-transparent"
				name="foreground color"
				id="foreground-input"
				bind:value={foreground}
				on:input={() => ($id = Math.random())}
			/>
			<label un-text="sm" for="foreground-input">Foreground color</label>
			<input
				type="color"
				class="p-0 w-1.5em h-1.5em b-0 rounded-md bg-transparent"
				name="background color"
				id="background-input"
				bind:value={background}
				on:input={() => ($id = Math.random())}
			/>
			<label un-text="sm" for="background-input">Background color</label>
		</div>
		<div un-m="t-3">
			<input
				type="checkbox"
				name="vertical layout"
				id="vertical-input"
				bind:checked={isVertical}
				on:input={() => ($id = Math.random())}
			/>
			<label un-text="sm" for="vertical-input">Vertical layout</label>
			<input
				un-m="l-5"
				type="checkbox"
				name="right to left"
				id="rtl-input"
				bind:checked={isRtl}
				on:input={() => ($id = Math.random())}
			/>
			<label un-text="sm" for="rtl-input">Right-to-Left</label>
		</div>
	</section>
	<section un-flex="~ col">
		{#key isVertical || isRtl}
			{#key $id}
				<Banner
					options={{
						title,
						subtitle,
						fonts: data.banner.fonts,
						layout: isVertical ? 'vertical' : 'horizontal',
						colors: { background, foreground },
						icon: iconName,
						rtl: isRtl,
					}}
				/>
			{/key}
		{/key}
		<button
			un-m="1em"
			un-appearance-none
			un-bg="transparent"
			un-text="white opacity-50 start"
			un-border="0"
			un-max-w="1000px"
			un-cursor="pointer"
			un-relative
			on:click={() => {
				navigator.clipboard.writeText(url.toString());
				copied = true;
			}}
			data-tooltip-target
			on:mouseleave={() => (copied = false)}
		>
			<p
				id="tooltip"
				role="tooltip"
				un-absolute
				un-invisible
				un-top="-3em"
				un-z="1"
				un-transition="all"
				un-opacity="0"
				un-transform="translate-y-5px"
			>
				<span un-i-solar-clipboard-add-bold un-inline-block un-m="r-1">
					Pointer
				</span>
				{#if copied}
					Copied to clipboard!
				{:else}
					Copy to clipboard
				{/if}
			</p>
			<code>{url}</code>
		</button>
	</section>
</div>

<style>
	input[type="text"],
	textarea {
		@apply bg-transparent b-0 bg-white text-black rounded-md font-sans;
	}

	[data-tooltip-target]:hover > [role="tooltip"] {
		transform: translateY(0);
		opacity: 1;
		visibility: visible;
	}
</style>

<script lang="ts">
	import type { BannerOptions } from '@marknow/banners';
	import newBanner from '@marknow/banners';

	export let options: BannerOptions;

	async function loadSvg() {
		const bannerSvg = newBanner(options);

		pastSvg.set((await bannerSvg).svg);

		return bannerSvg;
	}
</script>

<picture un-w="1000px" un-h="280px" un-relative>
	{#await loadSvg()}
		<img src={`data:image/svg+xml, ${encodeSvg(get(pastSvg))}`} alt="Resulting banner">
		<div un-m="l-2">
			<span un-i-svg-spinners-blocks-shuffle-3 un-inline-block un-m="r-1">
				Spinner
			</span>Creating svg
		</div>
	{:then banner}
		<img src={`data:image/svg+xml, ${encodeSvg(banner.svg)}`} alt="Resulting banner">
	{/await}
</picture>

<style>
	:global(#bannerHtml) {
		padding: 0 !important;
		height: var(--height) !important;
	}
	:global(#bannerHtml > div > div > div:first-child) {
		margin: 0 0 0 2.5em !important;
	}
</style>

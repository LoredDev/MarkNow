<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main un-grid="~ rows-4">
	<div un-h="sm" un-flex="~ justify-center items-center" un-bg="#33578a">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.banner}
	</div>
	<div un-h="sm" un-flex="~ justify-center items-center" un-bg="#0d1117">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.banner}
	</div>
	<div un-h="sm" un-flex="~ justify-center items-center" un-bg="#ffffff">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.banner}
	</div>
	<div un-h="sm" un-flex="~ justify-center items-center" un-bg="#0a0c10">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.banner}
	</div>
	<div un-h="sm" un-flex="~ justify-center items-center" un-bg="#22272e">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html data.banner}
	</div>
</main>

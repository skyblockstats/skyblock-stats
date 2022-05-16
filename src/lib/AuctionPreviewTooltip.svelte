<script lang="ts">
	import type { PreviewedAuctionData } from './utils'

	export let preview: PreviewedAuctionData | null
</script>

{#if preview}
	<div id="auction-preview-tooltip" style="left: {preview.pageX}px; top: {preview.pageY}px">
		<p>uuid: {JSON.stringify(preview)}</p>
	</div>
{/if}

<style>
	#auction-preview-tooltip {
		position: absolute;
		width: 10em;
		height: 10em;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: var(--theme-lighter-background);
		pointer-events: none;
	}
</style>

<script lang="ts">
	import { API_URL } from './api'

	import Loader from './layout/Loader.svelte'
	import type { PreviewedAuctionData } from './utils'

	export let preview: PreviewedAuctionData | null
	let lastPreview: PreviewedAuctionData | null

	$: lastPreview = preview ?? lastPreview

	function onClick(e) {
		// commented out because it doesn't work: sometimes e.target is null when we click a point
		// if (!e.target.closest('.item-auction-history')) {
		// 	preview = null
		// 	lastPreview = null
		// }
	}
</script>

<svelte:body on:click={onClick} />

{#if lastPreview}
	{@const date = new Date(lastPreview.auction.ts * 1000)}
	<div
		id="auction-preview-tooltip"
		class:hidden={preview === null}
		style="left: {lastPreview.pageX}px; top: {lastPreview.pageY}px"
	>
		<p><b>{lastPreview.auction.coins.toLocaleString()}</b> coins</p>
		<time>{date.toLocaleString()}</time>
	</div>
{/if}

<style>
	#auction-preview-tooltip {
		position: absolute;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.5em;
		transition: left 200ms, top 200ms;
		pointer-events: none;
	}

	p {
		margin: 0;
	}

	time {
		color: var(--theme-darker-text);
	}
</style>

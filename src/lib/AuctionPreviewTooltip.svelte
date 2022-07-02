<script lang="ts">
	import { formattingCodeToHtml, type PreviewedAuctionData } from './utils'
	import { fade } from 'svelte/transition'
	import { fetchApi } from './api'
	import type { Auction } from './APITypes'

	export let preview: PreviewedAuctionData | null
	export let auction: Auction | null = null
	let lastPreview: PreviewedAuctionData | null

	$: {
		lastPreview = preview ?? lastPreview
	}

	function onMouseMove(e: MouseEvent) {
		// commented out because it doesn't work: sometimes e.target is null when we click a point
		if (e.target && !(e.target as HTMLElement).closest('.item-auction-history')) {
			preview = null
			lastPreview = null
		}
	}

	async function fetchAuctionData() {
		if (!preview) return

		auction = null
		auction = await fetchApi(`auction/${preview.auction.id}`, fetch).then(r => r.json())
	}

	$: {
		preview
		fetchAuctionData()
	}
</script>

<svelte:body on:mousemove={onMouseMove} />

{#if lastPreview}
	<div
		id="auction-preview-tooltip-container"
		style={lastPreview ? `left: ${lastPreview.pageX}px; top: ${lastPreview.pageY}px` : undefined}
		out:fade={{ duration: 100 }}
		in:fade={{ duration: 100 }}
	>
		<div id="auction-preview-tooltip">
			<p><b>{lastPreview.auction.coins.toLocaleString()}</b> coins</p>
			<time>{new Date(lastPreview.auction.ts * 1000).toLocaleString()}</time>
			{#if auction}
				<div class="lore">
					{@html auction.item.display.lore.map(l => formattingCodeToHtml(l)).join('<br>')}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	#auction-preview-tooltip-container {
		position: absolute;
		pointer-events: none;
		transition: left 100ms linear, top 100ms linear;
		z-index: 10;
	}
	#auction-preview-tooltip {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.9);
		padding: 0.5em;
	}

	p {
		margin: 0;
	}

	time {
		color: var(--theme-darker-text);
	}

	.lore {
		margin-top: 0.5em;
	}
</style>

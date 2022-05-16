<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const data = await fetch(`${API_URL}auctionprices`).then(r => r.json())

		return {
			props: {
				data,
			},
		}
	}
</script>

<script lang="ts">
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'
	import {
		millisecondsToTime,
		TIER_COLORS,
		colorCodes,
		cleanId,
		toTitleCase,
		type PreviewedAuctionData,
	} from '$lib/utils'
	import type { ItemAuctionsSchema, ItemListData, ItemListItem } from '$lib/APITypes'
	import Item from '$lib/minecraft/Item.svelte'
	import AuctionPriceScatterplot from '$lib/AuctionPriceScatterplot.svelte'
	import AuctionPreviewTooltip from '$lib/AuctionPreviewTooltip.svelte'

	export let data: ItemAuctionsSchema[]

	let currentlyPreviewedAuction: PreviewedAuctionData | null

	let query: string = ''

	let pageHeight = 0
	$: {
		pageHeight = 0
	}

	function checkScroll() {
		let pageHeightTemp = window.scrollY + window.innerHeight
		if (pageHeightTemp <= pageHeight) return
		pageHeight = pageHeightTemp
		if (pageHeight >= document.body.scrollHeight - 1000) {
		}
	}
</script>

<Head title="SkyBlock Item List" />
<Header />

<svelte:window on:scroll={checkScroll} />

<AuctionPreviewTooltip preview={currentlyPreviewedAuction} />

<main>
	<h1>SkyBlock Auction Prices</h1>
	<div class="filter-items-settings">
		<input type="text" id="filter-items-tier" placeholder="Search..." bind:value={query} />
	</div>
	<div class="item-list">
		{#each data as item (item._id)}
			{@const binAuctions = item.auctions.filter(i => i.bin)}
			{@const normalAuctions = item.auctions.filter(i => !i.bin)}
			<div class="item-container">
				<h2>{cleanId(item._id.toLowerCase())}</h2>
				<div class="auctions-info-text">
					{#if binAuctions.length > 0}
						<p>
							Lowest recent BIN: <b>
								{binAuctions.reduce((a, b) => (a.coins < b.coins ? a : b)).coins.toLocaleString()} coins
							</b>
						</p>
					{/if}
					{#if normalAuctions.length > 0}
						<p>
							Lowest recent auction: <b>
								{normalAuctions
									.reduce((a, b) => (a.coins < b.coins ? a : b))
									.coins.toLocaleString()} coins
							</b>
						</p>
					{/if}
				</div>
				<div class="item-scatterplot">
					<AuctionPriceScatterplot {item} bind:currentlyPreviewedAuction />
				</div>
			</div>
		{/each}
		{#if data.length === 0}
			No results
		{/if}
	</div>
</main>

<style>
	p {
		margin: 0;
	}
	.item-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
		grid-gap: 1em;
		margin-top: 1em;
	}
	.item-container {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.75em;
		border-radius: 1em;
	}

	.item-scatterplot {
		margin-top: 1em;
	}

	.auctions-info-text {
		color: var(--theme-darker-text);
	}
	.auctions-info-text b {
		color: var(--theme-main-text);
	}
</style>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const auctionItemsPromise = fetch(`${API_URL}auctionitems`).then(r => r.json())
		const data = await fetch(`${API_URL}auctionprices`).then(r => r.json())
		const auctionItems = await auctionItemsPromise

		return {
			props: {
				data,
				auctionItems,
			},
		}
	}
</script>

<script lang="ts">
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'
	import { cleanId, removeFormattingCode, toTitleCase, type PreviewedAuctionData } from '$lib/utils'
	import type { ItemAuctionsSchema } from '$lib/APITypes'
	import AuctionPriceScatterplot from '$lib/AuctionPriceScatterplot.svelte'
	import AuctionPreviewTooltip from '$lib/AuctionPreviewTooltip.svelte'
	import { browser } from '$app/env'
	import Item from '$lib/minecraft/Item.svelte'
	import furfskyReborn from 'skyblock-assets/matchers/furfsky_reborn.json'

	export let data: ItemAuctionsSchema[]
	export let auctionItems: Record<string, { display: { name: string }; vanillaId?: string }>

	let currentlyPreviewedAuction: PreviewedAuctionData | null = null

	let query: string = ''

	$: queryNormalized = query.toLowerCase()

	let allMatchingItemIds: string[]
	$: {
		pageNumber = 0
		allMatchingItemIds = Object.entries(auctionItems)
			.filter(a => removeFormattingCode(a[1]?.display.name.toLowerCase()).includes(queryNormalized))
			.map(a => a[0])
	}
	$: {
		if (browser) fetchAndSetItems(allMatchingItemIds.slice(0, 100))
	}

	async function fetchAndSetItems(itemIds: string[]) {
		const localQuery = query
		const localData = await fetchItems(query.length > 0 ? itemIds : null)
		// if the query hasn't changed, update the data
		if (query === localQuery) data = localData
	}
	async function fetchItems(itemIds: null | string[]): Promise<ItemAuctionsSchema[]> {
		let url = `${API_URL}auctionprices`
		if (itemIds !== null) {
			if (itemIds.length === 0) return []
			url += `?items=${itemIds.join(',')}`
		}
		return await fetch(url).then(r => r.json())
	}

	let pageHeight = 0
	$: {
		pageHeight = 0
	}

	// 0 indexed
	let pageNumber = 0
	let loadingPage = false

	async function checkScroll() {
		if (loadingPage) return

		let pageHeightTemp = window.scrollY + window.innerHeight
		if (pageHeightTemp <= pageHeight) return
		pageHeight = pageHeightTemp
		if (pageHeight >= document.body.scrollHeight - 1000) {
			loadingPage = true
			pageNumber++
			const itemIds = allMatchingItemIds.slice(pageNumber * 100, (pageNumber + 1) * 100)
			if (itemIds.length > 0) {
				const shownIds = data.map(d => d.id)
				const items = (await fetchItems(itemIds)).filter(i => !shownIds.includes(i.id))
				if (items.length > 0) data = [...data, ...items]
			}
			loadingPage = false
		}
	}

	$: {
		if (browser && !currentlyPreviewedAuction) {
			for (const el of document.getElementsByClassName('selected-auction'))
				el.classList.remove('selected-auction')
		}
	}
</script>

<Head title="SkyBlock Auction Prices" />
<Header />

<svelte:window on:scroll={checkScroll} />

<AuctionPreviewTooltip bind:preview={currentlyPreviewedAuction} />

<main>
	<h1>SkyBlock Auction Prices</h1>
	<div class="filter-items-settings">
		<input type="text" id="filter-items-tier" placeholder="Search..." bind:value={query} />
	</div>
	<div class="item-list">
		{#each data as item (item.id)}
			{@const binAuctions = item.auctions.filter(i => i.bin)}
			{@const normalAuctions = item.auctions.filter(i => !i.bin)}
			{@const itemData = auctionItems[item.sbId]}
			<div class="item-container">
				{#if itemData && itemData.vanillaId}
					<div class="item-slot-container">
						<Item item={{ ...itemData, id: item.id }} pack={furfskyReborn} headSize={50} isslot />
					</div>
				{/if}
				<h2>
					{removeFormattingCode(
						auctionItems[item.id]?.display.name ?? toTitleCase(cleanId(item.id.toLowerCase()))
					)}
				</h2>
				<div class="auctions-info-text">
					{#if binAuctions.length > 0}
						<p>
							Cheapest recent BIN: <b>
								{binAuctions.reduce((a, b) => (a.coins < b.coins ? a : b)).coins.toLocaleString()} coins
							</b>
						</p>
					{/if}
					{#if normalAuctions.length > 0}
						<p>
							Cheapest recent auction: <b>
								{normalAuctions
									.reduce((a, b) => (a.coins < b.coins ? a : b))
									.coins.toLocaleString()} coins
							</b>
						</p>
					{/if}
					{#if item.auctions.length >= 2}
						<p>
							Median:
							<b>
								{[...item.auctions]
									.sort((a, b) => a.coins - b.coins)
									[Math.floor(item.auctions.length / 2)].coins.toLocaleString()} coins
							</b>
						</p>
						<p>
							Volume:
							<b>
								{parseFloat(
									(
										(24 * 60 * 60) /
										((Date.now() / 1000 - item.auctions[0].ts) / item.auctions.length)
									).toPrecision(2)
								).toLocaleString()}/day
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
		grid-template-columns: repeat(auto-fill, minmax(16em, 1fr));
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

	.item-slot-container {
		float: right;
	}
</style>

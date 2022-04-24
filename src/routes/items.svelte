<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const data = await fetch(`${API_URL}items`).then(r => r.json())

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
	import { millisecondsToTime, TIER_COLORS, colorCodes, cleanId, toTitleCase } from '$lib/utils'
	import type { ItemListData, ItemListItem } from '$lib/APITypes'
	import Item from '$lib/minecraft/Item.svelte'
	import furfskyReborn from 'skyblock-assets/matchers/furfsky_reborn.json'

	export let data: ItemListData

	let now = Date.now()

	let query: string = ''
	let filterCategory = 'any'
	let filterTier = 'any'
	// this is pre-calculated here so we don't have to keep lowercasing it
	$: normalizedQuery = query.toLowerCase().replace(/_/g, ' ')

	$: filteredItems = data.list
		.filter(
			i =>
				i.display.name.toLowerCase().replace(/_/g, ' ').includes(normalizedQuery) ||
				i.id.toLowerCase().replace(/_/g, ' ').includes(normalizedQuery)
		)
		.filter(i => filterCategory === 'any' || i.category === filterCategory)
		.filter(i => filterTier === 'any' || i.tier === filterTier)

	let pageHeight = 0
	let filteredItemsSliced: ItemListItem[]
	$: {
		filteredItemsSliced = filteredItems.slice(0, 200)
		pageHeight = 0
	}

	function checkScroll() {
		let pageHeightTemp = window.scrollY + window.innerHeight
		if (pageHeightTemp <= pageHeight) return
		pageHeight = pageHeightTemp
		if (pageHeight >= document.body.scrollHeight - 1000) {
			filteredItemsSliced = filteredItems.slice(0, filteredItemsSliced.length + 200)
		}
	}

	let categories: Set<string> = new Set()
	let tiers: Set<string> = new Set()
	for (const i of data.list) {
		if (i.category) categories.add(i.category)
		if (i.tier) tiers.add(i.tier)
	}
</script>

<Head title="SkyBlock Item List" />
<Header />

<svelte:window on:scroll={checkScroll} />

<main>
	<div class="last-updated">
		Last updated: <time datetime="${data.lastUpdated}"
			>{millisecondsToTime(now - data.lastUpdated)} ago
		</time>
	</div>
	<h1>SkyBlock Item List</h1>
	<p class="results-count">{filteredItems.length.toLocaleString()} items</p>
	<div class="filter-items-settings">
		<input type="text" id="filter-items-tier" placeholder="Search..." bind:value={query} />

		<label for="filter-items-tier">Tier:</label>
		<select id="filter-items-tier" class="filter-items-tier" bind:value={filterTier}>
			<option value="any" selected>Any</option>
			{#each Array.from(tiers) as tier}
				<option value={tier}>{cleanId(tier.toLowerCase())}</option>
			{/each}
		</select>

		<label for="filter-items-category">Category:</label>
		<select id="filter-items-category" class="filter-items-category" bind:value={filterCategory}>
			<option value="any" selected>Any</option>
			{#each Array.from(categories) as category}
				<option value={category}>{cleanId(category)}</option>
			{/each}
		</select>
	</div>
	<div class="item-list">
		{#each filteredItemsSliced as item (item.id)}
			<div class="item-container">
				<span class="item-slot-container"><Item {item} pack={furfskyReborn} /></span>
				<a href="https://wiki.hypixel.net/{item.display.name.replace(/ /g, '_')}"
					><h3
						class="item-name"
						style={item.tier ? `color: ${colorCodes[TIER_COLORS[item.tier]]}` : undefined}
					>
						{item.display.name}
					</h3></a
				>
				<div>
					{#if item.museum}
						<p>
							<span class="item-info-label">Museum</span>
						</p>
					{/if}
					{#if item.soulbound}
						<p>
							<span class="item-info-label">Soulbound</span>
						</p>
					{/if}
					{#if item.category}
						<p>
							<span class="item-info-label">Category:</span>
							<span class="item-info-value">
								{toTitleCase(cleanId(item.category))}
							</span>
						</p>
					{/if}
					{#if item.npcSellPrice}
						<p>
							<span class="item-info-label">NPC sell price:</span>
							<span class="item-info-value">
								{#if item.npcSellPrice == 1}1 coin{:else}
									{item.npcSellPrice.toLocaleString()} coins{/if}
							</span>
						</p>
					{/if}
					{#if Object.keys(item.requirements).length > 0}
						<div>
							<span class="item-info-label">Requirements:</span>
							<ul>
								{#if item.requirements.dungeon}
									<li>
										{cleanId(item.requirements.dungeon.type)}
										{item.requirements.dungeon.level}
									</li>
								{/if}
								{#if item.requirements.skill}
									<li>
										{cleanId(item.requirements.skill.type)}
										{item.requirements.skill.level}
									</li>
								{/if}
								{#if item.requirements.slayer}
									<li>
										{cleanId(item.requirements.slayer.boss)}
										Slayer
										{item.requirements.slayer.level}
									</li>
								{/if}
							</ul>
						</div>
					{/if}
				</div>
			</div>
		{/each}
		{#if filteredItems.length === 0}
			No results!
		{/if}
	</div>
</main>

<style>
	.last-updated {
		float: right;
		color: var(--theme-darker-text);
	}

	p,
	ul {
		margin: 0;
	}
	li {
		position: relative;
		left: -1rem;
	}
	.results-count {
		position: relative;
		top: -1em;
	}
	.item-slot-container {
		float: right;
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

	.item-info-label {
		color: var(--theme-darker-text);
	}
	.item-info-value {
		color: var(--theme-main-text);
	}
</style>

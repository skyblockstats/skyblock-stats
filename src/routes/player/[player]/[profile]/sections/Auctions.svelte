<!-- 
	@component

	A list of the player's past auctions, and their auction stats.
-->
<script lang="ts">
	import { cleanId, millisecondsToTime } from '$lib/utils'
	import type { CleanMemberProfile, StatItem } from '$lib/APITypes'
	import { fetchApi } from '$lib/api'
	import type { MatcherFile } from 'skyblock-assets'
	import Auction from '$lib/Auction.svelte'

	export let data: CleanMemberProfile
	export let stats: StatItem[]
	export let pack: MatcherFile

	let onlyThisProfile = true

	let auctions: any[] = []
	let loading = true

	let page = 0
	let totalPages: number | undefined = undefined

	async function updateAuctions() {
		loading = true
		const thisPage = page
		page += 1
		const auctionsResponse = await fetchApi(
			`playerauctions/${data.member.uuid}?page=${thisPage}`,
			fetch
		).then(r => r.json())
		loading = false
		auctions = [...auctions, ...auctionsResponse.auctions]
		totalPages = auctionsResponse.pages
	}

	updateAuctions()
</script>

<div class="auction-stats-and-list-container">
	<ul>
		{#each stats.sort((a, b) => b.value - a.value) as stat}
			<li>
				<span class="stat-name">{cleanId(stat.categorizedName)}:</span>
				<span class="stat-value">
					{#if stat.unit === 'time'}
						{millisecondsToTime(stat.value)}
					{:else}
						{stat.value.toLocaleString()}
					{/if}
				</span>
			</li>
		{/each}
	</ul>

	<div class="player-auctions-list-container">
		{#if loading || auctions.length > 0}
			<h3>Auctions sold</h3>
		{/if}
		{#if auctions.length > 0}
			<div class="player-auctions-list">
				{#each auctions as auction}
					{#if !onlyThisProfile || auction.sellerProfileUuid == data.profile.uuid}
						<Auction {auction} {pack} />
					{/if}
				{/each}
			</div>
			{#if !loading && page != totalPages}
				<button on:click={updateAuctions}>Show more</button>
			{/if}
		{/if}
		{#if loading}
			Loading...
		{/if}
	</div>
</div>

<style>
	li {
		position: relative;
	}
	ul {
		padding-left: 1em;
		margin-top: 0.5em;
		width: max-content;
	}
	.auction-stats-and-list-container {
		display: grid;
		grid-template-columns: 1fr auto;
	}

	@media (max-width: 600px) {
		.auction-stats-and-list-container {
			grid-template-columns: 1fr;
		}
	}

	.player-auctions-list {
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
	}
	.player-auctions-list-container {
		margin-top: 0.5em;
		margin-left: 0.5em;
	}
</style>

<!-- 
	@component

	A list of the player's past auctions, and their auction stats.
-->
<script lang="ts">
	import { cleanId, millisecondsToTime, removeFormattingCode } from '$lib/utils'
	import type { CleanMemberProfile, StatItem } from '$lib/APITypes'
	import { fetchApi } from '$lib/api'
	import Item from '$lib/minecraft/Item.svelte'
	import type { MatcherFile } from 'skyblock-assets'
	import Username from '$lib/minecraft/Username.svelte'

	export let data: CleanMemberProfile
	export let stats: StatItem[]
	export let pack: MatcherFile

	let onlyThisProfile = true
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
		{#await fetchApi(`playerauctions/${data.member.uuid}`, fetch).then(r => r.json())}
			<h3>Auctions sold</h3>
			Loading...
		{:then auctions}
			{#if auctions.length > 0}
				<h3>Auctions sold</h3>
				<div class="player-auctions-list">
					{#each auctions as auction}
						{#if !onlyThisProfile || auction.sellerProfileUuid == data.profile.uuid}
							<div class="auction">
								<div class="item-slot-container">
									<Item item={auction.item} {pack} />
								</div>

								<h4 class="auction-item-name">
									{removeFormattingCode(auction.item.display.name)}
								</h4>
								{#if auction.bin}
									<b>Bin</b>
								{/if}
								<div class="auction-info-text">
									<p>Coins: <b>{auction.coins.toLocaleString()}</b></p>
									<p>Buyer: <Username player={auction.buyer} prefix hyperlinkToProfile /></p>
									<p>{millisecondsToTime(Date.now() - auction.creationTimestamp)} ago</p>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		{/await}
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
	p {
		margin: 0;
	}

	.auction-stats-and-list-container {
		display: grid;
		grid-template-columns: 1fr auto;
	}

	.auction-info-text {
		color: var(--theme-darker-text);
	}
	.auction-info-text b {
		color: var(--theme-main-text);
	}

	.auction-item-name {
		font-size: 1.5rem;
		margin: 0;
	}

	.auction {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.75em;
		border-radius: 1em;
		width: 18em;
	}
	.player-auctions-list {
		display: flex;
		flex-wrap: wrap;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
	}
	.item-slot-container {
		float: right;
	}
	.player-auctions-list-container {
		margin-top: 0.5em;
		margin-left: 0.5em;
	}
</style>

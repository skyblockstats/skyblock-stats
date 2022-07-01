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
	let showingSoldAuctions = false
</script>

<div class="player-auctions-list-container">
	{#if showingSoldAuctions}
		{#await fetchApi(`playerauctions/${data.member.uuid}`, fetch).then(r => r.json())}
			Loading...
		{:then auctions}
			{#if auctions.length > 0}
				<button
					on:click={() => {
						showingSoldAuctions = !showingSoldAuctions
					}}>Hide sold auctions</button
				>

				<div class="player-auctions-list">
					{#each auctions as auction}
						{#if !onlyThisProfile || auction.sellerProfileUuid == data.profile.uuid}
							<div class="auction">
								<div class="item-slot-container">
									<Item item={auction.item} {pack} />
								</div>

								<h2>
									{removeFormattingCode(auction.item.display.name)}
								</h2>
								{#if auction.bin}
									<b>Bin</b>
								{/if}
								<div class="auction-info-text">
									<p>Coins: <b>{auction.coins.toLocaleString()}</b></p>
									<p>Buyer: <Username player={auction.buyer} prefix hyperlinkToProfile /></p>
									<p>{millisecondsToTime(auction.creationTimestamp)} ago</p>
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		{/await}
	{:else}
		<button
			on:click={() => {
				showingSoldAuctions = !showingSoldAuctions
			}}>Show sold auctions</button
		>
	{/if}
</div>

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

<style>
	li {
		position: relative;
	}
	ul {
		padding-left: 1em;
		margin-top: 0.5em;
	}
	p {
		margin: 0;
	}

	.auction-info-text {
		color: var(--theme-darker-text);
	}
	.auction-info-text b {
		color: var(--theme-main-text);
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
	}
</style>

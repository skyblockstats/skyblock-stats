<script lang="ts">
	import type { MatcherFile } from 'skyblock-assets'
	import Item from './minecraft/Item.svelte'
	import Username from './minecraft/Username.svelte'
	import { millisecondsToTime, removeFormattingCode } from './utils'

	export let auction
	export let pack: MatcherFile
</script>

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

<style>
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
	.item-slot-container {
		float: right;
	}

	p {
		margin: 0;
	}
</style>

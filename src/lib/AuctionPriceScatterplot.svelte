<script lang="ts">
	import type { ItemAuctionsSchema } from './APITypes'

	export let item: ItemAuctionsSchema

	let maxCoins: number = item.auctions.reduce((max, auction) => Math.max(max, auction.coins), 0)

	let currentTimestamp = Math.floor(Date.now() / 1000)

	let lowestCoinsAuction = item.auctions.reduce(
		(min, auction) => (auction.coins < min.coins ? auction : min),
		{ coins: Infinity, ts: currentTimestamp }
	)

	let earliestTimestamp = item.auctions.length > 0 ? item.auctions[0].ts : 0

	let minutesBetween = (currentTimestamp - earliestTimestamp) / 360

	let gridWidth = 100 / minutesBetween
</script>

<svg viewBox="0 0 100 100" class="item-auction-history">
	<defs>
		<pattern id="grid-{item._id}" width={gridWidth} height="10" patternUnits="userSpaceOnUse">
			<path d="M {gridWidth} 0 L 0 0 0 10" fill="none" stroke="#fff2" stroke-width="1" />
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#grid-{item._id})" />

	{#each item.auctions as auction}
		{@const timestampPercentage =
			(auction.ts - earliestTimestamp) / (currentTimestamp - earliestTimestamp)}
		<circle
			cx={timestampPercentage * 100}
			cy={100 - (auction.coins / maxCoins) * 100}
			r="1"
			stroke-width="4"
			fill={auction.bin ? '#11b' : '#1b1'}
		/>
	{/each}
	<!-- {item.auctions} -->
</svg>

<style>
	.item-auction-history {
		height: 10em;
		width: 100%;
	}
</style>

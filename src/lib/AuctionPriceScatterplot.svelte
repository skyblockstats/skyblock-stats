<script lang="ts">
	import type { ItemAuctionsSchema, SimpleAuctionSchema } from './APITypes'
	import type { PreviewedAuctionData } from './utils'

	export let item: ItemAuctionsSchema
	export let currentlyPreviewedAuction: PreviewedAuctionData | null

	let svgEl: SVGElement
	let maxCoins: number = item.auctions.reduce((max, auction) => Math.max(max, auction.coins), 0)
	let currentTimestamp = Math.floor(Date.now() / 1000)
	let earliestTimestamp = item.auctions.length > 0 ? item.auctions[0].ts : 0
	let hoursBetween = (currentTimestamp - earliestTimestamp) / (60 * 60)
	const gridWidth = 100 / hoursBetween

	let heightCoinInterval = Math.pow(10, Math.floor(Math.log10(maxCoins / 2)))

	const gridHeight = 100 / (maxCoins / heightCoinInterval)

	function getAuctionCoordinates(auction: SimpleAuctionSchema) {
		const timestampPercentage =
			(auction.ts - earliestTimestamp) / (currentTimestamp - earliestTimestamp)
		return [timestampPercentage * 100, 100 - (auction.coins / maxCoins) * 100]
	}

	function updateNearest(e: MouseEvent) {
		const rect = svgEl.getBoundingClientRect()

		const mouseCoords = [e.clientX - rect.left, e.clientY - rect.top]
		let nearestDistance = Number.MAX_SAFE_INTEGER
		let nearestAuction: SimpleAuctionSchema | null = null
		for (const auction of item.auctions) {
			const auctionCoordsSvg = getAuctionCoordinates(auction)
			const auctionCoords = [
				(auctionCoordsSvg[0] * rect.width) / 100,
				(auctionCoordsSvg[1] * rect.height) / 100,
			]
			const distance =
				Math.pow(mouseCoords[0] - auctionCoords[0], 2) +
				Math.pow(mouseCoords[1] - auctionCoords[1], 2)
			if (distance < nearestDistance) {
				nearestDistance = distance
				nearestAuction = auction
			}
		}
		if (nearestAuction) {
			const [svgX, svgY] = getAuctionCoordinates(nearestAuction)
			const [x, y] = [(svgX * rect.width) / 100, (svgY * rect.height) / 100]
			currentlyPreviewedAuction = {
				pageX: window.scrollX + rect.left + x,
				pageY: window.scrollY + rect.top + y,
				auction: nearestAuction,
			}
		} else currentlyPreviewedAuction = null
	}
</script>

{#if item.auctions.length > 0}
	<svg viewBox="0 0 100 100" class="item-auction-history">
		<defs>
			<pattern
				id="grid-{item.id}"
				width={gridWidth}
				height={gridHeight}
				patternUnits="userSpaceOnUse"
				x="0%"
				y="100%"
			>
				<path
					d="M {gridWidth} 0 L 0 0 0 {gridHeight}"
					fill="none"
					stroke="#fff2"
					stroke-width="1"
				/>
			</pattern>
		</defs>
		<rect
			width="100%"
			height="100%"
			fill="url(#grid-{item.id})"
			on:mousemove={updateNearest}
			bind:this={svgEl}
		/>

		{#each item.auctions as auction}
			{@const [x, y] = getAuctionCoordinates(auction)}
			<circle
				cx={x}
				cy={y}
				r="1"
				stroke-width="4"
				fill={auction.bin ? '#11b' : '#1b1'}
				class:selected-auction={currentlyPreviewedAuction?.auction?.id === auction?.id}
			/>
		{/each}
		<!-- {item.auctions} -->
	</svg>
{/if}

<style>
	.item-auction-history {
		height: 10em;
		width: 100%;
	}

	.selected-auction {
		stroke: #06e7;
	}
</style>

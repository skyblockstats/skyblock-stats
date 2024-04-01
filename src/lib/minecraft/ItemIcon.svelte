<script lang="ts">
	import type { MatcherFile } from 'skyblock-assets'
	import { itemToUrl } from './inventory'
	import { removeFormattingCode } from '$lib/utils'

	export let isslot = true
	export let item: any | null
	export let pack: MatcherFile | undefined = undefined
	export let headSize: number | undefined = undefined
	let imageUrl: string | null
	$: imageUrl = item ? itemToUrl(item, pack, headSize) : null
</script>

{#if item}
	<span class="item" class:item-slot={isslot}>
		{#if imageUrl}
			<img
				loading="lazy"
				src={imageUrl}
				alt={removeFormattingCode(item.display.name)}
				class:item-custom-head={imageUrl.startsWith('https://mc-heads.net/head/')}
			/>
		{/if}
		{#if item.count !== undefined && item.count !== 1}
			<span class="item-count">{item.count}</span>
		{/if}
	</span>
{:else}
	<!-- don't do all that if the item doesn't actually exist -->
	<span class="item" class:item-slot={isslot} />
{/if}

<style>
	.item-count {
		font-size: 0.45em;
		float: right;
		position: relative;
		top: 1.21em;
		right: 0.1em;
		font-family: Minecraft, 'Atkinson Hyperlegible', sans-serif;
	}
	.item-slot {
		border: 1px solid #888;
		border-radius: 0.1em;
		margin: 0.05em;
	}

	.item {
		display: inline-block;
		font-size: 32px;
		width: 1.2em;
		height: 1.2em;
		transition-property: font-size;
		transition-duration: 500ms;
	}
	.item img {
		position: absolute;
		margin-top: 0.075em;
		margin-left: 0.075em;
		width: 1em;
		height: 1em;
	}
	/* only pixelate items if they're not a head */
	.item img:not(.item-custom-head) {
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}

	img.item-custom-head {
		width: 0.75em;
		height: 0.75em;
		margin-top: 0.1875em;
		margin-left: 0.1875em;
	}
</style>

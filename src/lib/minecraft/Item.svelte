<script lang="ts">
	import { formattingCodeToHtml, removeFormattingCode } from '$lib/utils'
	import MinecraftTooltip from './MinecraftTooltip.svelte'
	import type { MatcherFile } from 'skyblock-assets'
	import { itemToUrl } from './inventory'

	export let item: any | null
	export let isslot = true
	export let pack: MatcherFile | undefined = undefined

	let itemLoreHtml: string | null
	let itemNameHtml: string | null
	let imageUrl: string | null

	$: itemLoreHtml = item ? item.display.lore.map(l => formattingCodeToHtml(l)).join('<br>') : null
	$: itemNameHtml = item ? formattingCodeToHtml(item.display.name) : null

	$: imageUrl = item ? itemToUrl(item, pack) : null
</script>

{#if item}
	<MinecraftTooltip>
		<span slot="name">{@html itemNameHtml}</span>
		<span slot="lore">{@html itemLoreHtml}</span>
		<span class="item" class:item-slot={isslot}>
			<!-- we have an if here because the item might be air -->
			{#if imageUrl}
				<img
					loading="lazy"
					src={imageUrl}
					alt={removeFormattingCode(item.display.name)}
					class:item-custom-head={imageUrl.startsWith('https://mc-heads.net/head/')}
				/>
			{/if}
			{#if item.count !== 1}
				<span class="item-count">{item.count}</span>
			{/if}
		</span>
	</MinecraftTooltip>
{:else}
	<!-- don't do all that if the item doesn't actually exist -->
	<span class="item" class:item-slot={isslot} />
{/if}

<style>
	.item {
		display: inline-block;
		font-size: 32px;
		width: 1.2em;
		height: 1.2em;
		transition-property: font-size;
		transition-duration: 500ms;
	}
	.item-slot {
		border: 1px solid #888;
		border-radius: 0.1em;
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

	.item-slot {
		margin: 0.05em;
	}

	.item-count {
		font-size: 0.45em;
		float: right;
		position: relative;
		top: 1.21em;
		right: 0.1em;
		font-family: Minecraft, 'Atkinson Hyperlegible', sans-serif;
	}
</style>

<script lang="ts">
	import MinecraftTooltip from './MinecraftTooltip.svelte'
	import { formattingCodeToHtml, removeFormattingCode } from '$lib/utils'
	import { itemToUrlCached } from './inventory'

	export let item: any | null
	export let isslot = true
	export let pack = ''

	$: itemLoreHtml = item.display.lore.map(l => formattingCodeToHtml(l)).join('<br>')
	$: itemNameHtml = formattingCodeToHtml(item.display.name)

	$: imageUrl = itemToUrlCached(item, pack)
</script>

<MinecraftTooltip>
	<span slot="name">{@html itemNameHtml}</span>
	<span slot="lore">{@html itemLoreHtml}</span>
	<span class="item item-slot" class:item-slot={isslot}>
		<!-- we have an if here because the item might be air -->
		{#if item}
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
		{/if}
	</span>
</MinecraftTooltip>

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

	.item-slot {
		margin: 0.05em;
	}

	.item-count {
		font-size: 0.45em;
		float: right;
		position: relative;
		top: 1.21em;
		right: 0.1em;
		font-family: Minecraft;
	}
</style>

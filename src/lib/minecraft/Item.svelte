<script lang="ts">
	import { cleanId, formattingCodeToHtml, removeFormattingCode, TIER_COLORS } from '$lib/utils'
	import MinecraftTooltip from './MinecraftTooltip.svelte'
	import type { MatcherFile } from 'skyblock-assets'
	import { itemToUrl } from './inventory'

	export let item: any | null
	export let isslot = true
	export let pack: MatcherFile | undefined = undefined

	let itemLoreHtml: string | null
	let itemNameHtml: string | null
	let imageUrl: string | null

	let extraLore: string[] = []
	if (!item?.display?.lore && item?.tier) {
		// ☠ &cRequires &5Enderman Slayer 7
		if (item.requirements.slayer)
			extraLore.push(
				`§4☠ §cRequires §5${cleanId(item.requirements.slayer.boss)} Slayer ${
					item.requirements.slayer.level
				}`
			)
		extraLore.push(`§l§${TIER_COLORS[item.tier] ?? 'c'}${item.tier.replace(/_/g, ' ')}`)
	}
	if (item?.id) {
		extraLore.push(`\n§8ID: ${item.id}`)
	}

	$: itemLoreHtml = item
		? (item.display?.lore ?? [])
				.concat(extraLore)
				.map(l => formattingCodeToHtml(l))
				.join('<br>')
		: null
	$: {
		let itemDisplayName = item?.display?.name
		if (itemDisplayName) {
			if (!itemDisplayName.includes('§') && item.tier)
				itemDisplayName = `§${TIER_COLORS[item.tier] ?? 'c'}${itemDisplayName}`
		}
		itemNameHtml = itemDisplayName ? formattingCodeToHtml(itemDisplayName) : null
	}

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
					class:item-custom-head={imageUrl.startsWith('https://h.matdoes.dev/3d/')}
				/>
			{/if}
			{#if item.count !== undefined && item.count !== 1}
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
		margin: 0.05em;
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

	.item-count {
		font-size: 0.45em;
		float: right;
		position: relative;
		top: 1.21em;
		right: 0.1em;
		font-family: Minecraft, 'Atkinson Hyperlegible', sans-serif;
	}
</style>

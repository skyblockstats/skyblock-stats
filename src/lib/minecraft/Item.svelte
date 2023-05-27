<script lang="ts">
	import { cleanId, formattingCodeToHtml, TIER_COLORS } from '$lib/utils'
	import MinecraftTooltip from './MinecraftTooltip.svelte'
	import type { MatcherFile } from 'skyblock-assets'
	import ItemIcon from './ItemIcon.svelte'

	export let item: any | null
	export let isslot = true
	export let pack: MatcherFile | undefined = undefined
	export let headSize: number | undefined = undefined

	let itemLoreHtml: string | null
	let itemNameHtml: string | null

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
</script>

{#if item}
	<MinecraftTooltip>
		<span slot="name">{@html itemNameHtml}</span>
		<span slot="lore">{@html itemLoreHtml}</span>
		<ItemIcon {item} {isslot} {pack} {headSize} />
	</MinecraftTooltip>
{:else}
	<!-- don't do all that if the item doesn't actually exist -->
	<ItemIcon {isslot} {item} />
{/if}

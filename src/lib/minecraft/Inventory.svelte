<script lang="ts">
	import type { Inventory, Item as APIItem } from '$lib/APITypes'
	import type { MatcherFile } from 'skyblock-assets'

	import Item from './Item.svelte'

	export let items: Inventory
	export let name = ''
	export let pack: MatcherFile | undefined = undefined
	export let groupLimit = 9

	// each item group has 9 items
	let itemGroups: APIItem[][] = []
	$: {
		itemGroups = []
		for (let i = 0; i < items.length; i += groupLimit) {
			itemGroups.push(items.slice(i, i + groupLimit))
		}
		if (name === 'inventory') {
			// in the inventory, the first 9 items are the hotbar and should be at the end
			itemGroups = itemGroups.slice(1).concat(itemGroups.slice(0, 1))
		}
	}
</script>

<div class="inventory-container" style="--group-limit:{groupLimit}">
	{#each itemGroups as itemGroup}
		{#each itemGroup as item}
			<Item {item} {pack} headSize={50} isslot />
		{/each}
	{/each}
</div>

<style>
	.inventory-container {
		width: fit-content;
		display: grid;
		grid-template-columns: repeat(var(--group-limit), 1fr);
		grid-gap: 0;
	}
</style>

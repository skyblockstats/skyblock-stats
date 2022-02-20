<script lang="ts">
	import Item from './Item.svelte'

	export let items
	export let name = ''
	export let pack = ''
	export let groupLimit = 9

	if (name === 'inventory')
		// in the inventory, the first 9 items are the hotbar and should be at the end
		items = items.slice(9).concat(items.slice(0, 9))

	// each item group has 9 items
	let itemGroups = []
	$: {
		itemGroups = []
		for (let i = 0; i < items.length; i += groupLimit) {
			itemGroups.push(items.slice(i, i + groupLimit))
		}
	}
</script>

<div class:inventory-container-{name}={name !== ''}>
	{#each itemGroups as itemGroup}
		<div>
			{#each itemGroup as item}
				<Item {item} {pack} isslot />
			{/each}
		</div>
	{/each}
</div>

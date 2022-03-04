<script lang="ts">
	import Inventory from '$lib/minecraft/Inventory.svelte'
	import { fade } from 'svelte/transition'
	import { cleanId } from '$lib/utils'
	import { skyblockItemToUrl } from '$lib/minecraft/inventory'

	export let data
	export let pack

	let displayingInventories: string[] = []
	for (const inventoryName in data.member.inventories)
		if (inventoryName !== 'armor') displayingInventories.push(inventoryName)

	let selectedInventoryName: string = displayingInventories[0]

	const inventoryIconMap = {
		inventory: 'nether_star',
		ender_chest: 'ender_chest',
		potion_bag: 'potion',
		fishing_bag: 'cod',
		quiver: 'arrow',
		wardrobe: 'leather_chestplate',
	}
</script>

<div id="inventory-tabs">
	{#each displayingInventories as inventoryName}
		<button
			class="inventory-tab"
			class:inventory-tab-active={inventoryName === selectedInventoryName}
			on:click={() => (selectedInventoryName = inventoryName)}
		>
			{#if inventoryName in inventoryIconMap}
				<img
					class="inventory-tab-icon"
					loading="lazy"
					src={skyblockItemToUrl(inventoryIconMap[inventoryName])}
					alt={cleanId(inventoryName)}
				/>
			{/if}
			<span class="inventory-tab-name">{cleanId(inventoryName)}</span>
		</button>
	{/each}
</div>
{#each displayingInventories as inventoryName}
	{#if inventoryName === selectedInventoryName}
		<div id={inventoryName} class="inventory-content">
			<Inventory items={data.member.inventories[inventoryName]} {pack} name={inventoryName} />
		</div>
	{/if}
{/each}

<style>
	#inventory-tabs {
		margin-bottom: 1em;
		overflow: hidden;
		border-radius: 1em;
		max-width: 40em;
		/* box-shadow: 0 0 1em #000; */
	}
	.inventory-tab {
		/* background-color: var(--theme-lighter-background); */
		background-color: rgba(20, 20, 20, 0.4);
		color: var(--theme-main-text);
		border: none;
		border-radius: 0;
		/* padding: 0.8em; */
		cursor: pointer;
		transition-duration: 200ms;
		height: 2.5em;
		vertical-align: middle;
	}
	.inventory-tab-icon {
		height: 1.5em;
		width: 1.5em;
		vertical-align: text-bottom;
		position: relative;
		top: 0.1em;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
	.inventory-tab-name {
		vertical-align: middle;
	}
	.inventory-tab:hover,
	.inventory-tab-active {
		background-color: rgba(20, 20, 20, 0.9);
	}
</style>

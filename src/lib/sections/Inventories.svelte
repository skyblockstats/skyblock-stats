<script lang="ts">
	import Inventory from '$lib/minecraft/Inventory.svelte'
	import { fade } from 'svelte/transition'
	import { cleanId } from '$lib/utils'

	export let data
	export let pack

	let displayingInventories: string[] = []
	for (const inventoryName in data.member.inventories)
		if (inventoryName !== 'armor') displayingInventories.push(inventoryName)

	let selectedInventoryName: string = displayingInventories[0]
</script>

<div id="inventory-tabs">
	{#each displayingInventories as inventoryName}
		<button
			class="inventory-tab"
			class:inventory-tab-active={inventoryName === selectedInventoryName}
			on:click={() => (selectedInventoryName = inventoryName)}
		>
			{cleanId(inventoryName)}
		</button>
	{/each}
</div>
{#each displayingInventories as inventoryName}
	{#if inventoryName === selectedInventoryName}
		<div id={inventoryName} class="inventory-content">
			<Inventory items={data.member.inventories[inventoryName]} {pack} />
		</div>
	{/if}
{/each}

<style>
	#inventory-tabs {
		margin-bottom: 1em;
		overflow: hidden;
		border-radius: 1em;
		max-width: max-content;
		width: min(40em, 100%);
	}
	.inventory-tab {
		background-color: var(--theme-lighter-background);
		color: var(--theme-main-text);
		border: none;
		padding: 1em;
		cursor: pointer;
		transition-duration: 200ms;
	}
	.inventory-tab:hover,
	.inventory-tab-active {
		background-color: var(--theme-lightest-background);
	}
</style>

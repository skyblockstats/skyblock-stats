<script lang="ts">
	import { skyblockItemToUrl, type Item } from '$lib/minecraft/inventory'
	import Inventory from '$lib/minecraft/Inventory.svelte'
	import type { MatcherFile } from 'skyblock-assets'
	import { cleanId } from '$lib/utils'

	export let data
	export let pack: MatcherFile

	let displayingInventories: string[] = []
	for (const inventoryName in data.member.inventories)
		if (inventoryName !== 'armor') displayingInventories.push(inventoryName)

	let selectedInventoryName: string = displayingInventories[0]

	const inventoryIconMap: Record<string, string | Item> = {
		inventory: {
			id: 'SKYBLOCK_MENU',
			vanillaId: 'nether_star',
			display: { name: 'SkyBlock Menu' },
		},
		ender_chest: {
			vanillaId: 'ender_chest',
			display: { name: '\\u00a7aEnder Chest' },
		},
		talisman_bag: {
			vanillaId: 'skull:3',
			display: { name: 'Accessory Bag' },
			headTexture: '961a918c0c49ba8d053e522cb91abc74689367b4d8aa06bfc1ba9154730985ff',
		},
		potion_bag: {
			vanillaId: 'skull:3',
			display: { name: 'Potion Bag' },
			headTexture: '9f8b82427b260d0a61e6483fc3b2c35a585851e08a9a9df372548b4168cc817c',
		},
		fishing_bag: {
			vanillaId: 'skull:3',
			display: { name: 'Fishing Bag' },
			headTexture: 'eb8e297df6b8dffcf135dba84ec792d420ad8ecb458d144288572a84603b1631',
		},
		quiver: {
			vanillaId: 'skull:3',
			display: {
				name: 'Quiver',
			},
			headTexture: '4cb3acdc11ca747bf710e59f4c8e9b3d949fdd364c6869831ca878f0763d1787',
		},
		wardrobe: {
			vanillaId: 'leather_chestplate',
			display: {
				name: '\\u00a7aWardrobe',
			},
		},
		trick_or_treat_bag: {
			vanillaId: 'skull:3',
			display: {
				name: 'Trick or Treat Bag',
			},
			headTexture: 'e50f712e877dfd910c97f3819a200a05d49ee6b83b592686e099b9ecd443f228',
		},
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
					src={skyblockItemToUrl(inventoryIconMap[inventoryName], pack)}
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
		padding: 0 0.5em;
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
		vertical-align: text-top;
	}
	.inventory-tab:hover,
	.inventory-tab-active {
		background-color: rgba(40, 40, 40, 0.9);
	}

	@media only screen and (max-width: 480px) {
		.inventory-content :global(.item) {
			/* there's no good way to override the existing 32px size without !important :( */
			font-size: 24px !important;
		}
	}
	@media only screen and (max-width: 350px) {
		.inventory-content :global(.item) {
			font-size: 16px !important;
		}
	}
</style>

<script lang="ts">
	import furfskyReborn from 'skyblock-assets/matchers/furfsky_reborn.json'
	import type { CleanMemberProfile, Collection } from '$lib/APITypes'
	import { skyblockItemToUrl } from '$lib/minecraft/inventory'
	import ListItemWithIcon from '$lib/ListItemWithIcon.svelte'
	import Tooltip from '$lib/Tooltip.svelte'
	import { cleanId } from '$lib/utils'

	export let data: CleanMemberProfile

	const categories: Record<string, Collection[]> = {}
	if (data.member.collections)
		for (const collection of data.member.collections) {
			if (!categories[collection.category]) categories[collection.category] = []
			categories[collection.category].push(collection)
		}
</script>

{#if data.member.collections}
	{#each Object.keys(categories).sort() as categoryName}
		{@const collections = categories[categoryName]}
		<h3>{cleanId(categoryName)}</h3>
		<ul>
			{#each collections as collection}
				<ListItemWithIcon
					url={skyblockItemToUrl(collection.name, furfskyReborn)}
					alt={cleanId(collection.name)}
				>
					<Tooltip>
						<span slot="tooltip">
							Amount: {collection.xp.toLocaleString()}
						</span>
						{cleanId(collection.name)}
						<span class="coll-level">{collection.level}</span>
					</Tooltip>
				</ListItemWithIcon>
			{/each}
		</ul>
	{/each}
{/if}

<style>
	ul {
		margin: 0;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 0;
		width: fit-content;
	}

	ul > :global(li) {
		width: 12em;
		height: 1.5em;
		text-overflow: ellipsis;
	}

	h3 {
		margin: 0.5em 0 0.5em 0.5em;
	}
</style>

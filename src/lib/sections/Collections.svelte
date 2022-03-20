<script lang="ts">
	import type { CleanMemberProfile, Collection } from '$lib/APITypes'
	import { skyblockItemToUrl } from '$lib/minecraft/inventory'
	import ListItemWithIcon from '$lib/ListItemWithIcon.svelte'
	import type { MatcherFile } from 'skyblock-assets'
	import Tooltip from '$lib/Tooltip.svelte'
	import { cleanId } from '$lib/utils'

	export let data: CleanMemberProfile
	export let pack: MatcherFile

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
					url={skyblockItemToUrl(collection.name, pack)}
					alt={cleanId(collection.name)}
				>
					<Tooltip>
						<span slot="tooltip">
							Amount: {collection.amount.toLocaleString()}
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
		display: flex;
		flex-wrap: wrap;
		width: fit-content;
		/* this ensures there's at most 2 lines */
		max-width: 30em;
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

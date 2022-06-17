<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { fetchApi } from '$lib/api'

	export const load: Load = async ({ fetch }) => {
		const data = await fetchApi(`leaderboards`, fetch).then(r => r.json())

		return {
			props: {
				data,
			},
		}
	}
</script>

<script lang="ts">
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'
	import Toc from '$lib/Toc.svelte'
	import Collapsible from '$lib/Collapsible.svelte'
	import { skyblockItemToUrl } from '$lib/minecraft/inventory'
	import { cleanId } from '$lib/utils'
	import ListItemWithIcon from '$lib/ListItemWithIcon.svelte'

	export let data: { [category: string]: string[] }
</script>

<Head title="Hypixel SkyBlock Leaderboards" />
<Header />

<main>
	<h1>SkyBlock Leaderboards</h1>
	<Toc categories={Object.keys(data)} />

	{#each Object.entries(data) as [category, leaderboards]}
		<section>
			<Collapsible id={category} lazy={false}>
				<ul>
					{#each leaderboards as leaderboard}
						{@const imageUrl = leaderboard.startsWith('collection_')
							? skyblockItemToUrl(leaderboard.slice(11))
							: null}
						{#if imageUrl}
							<ListItemWithIcon src={imageUrl}>
								<a href="/leaderboards/{leaderboard}">{cleanId(leaderboard)}</a>
							</ListItemWithIcon>
						{:else}
							<li><a href="/leaderboards/{leaderboard}">{cleanId(leaderboard)}</a></li>
						{/if}
					{/each}
				</ul>
			</Collapsible>
		</section>
	{/each}
</main>

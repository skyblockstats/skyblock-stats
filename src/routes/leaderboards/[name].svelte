<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const data = await fetch(`${API_URL}leaderboard/${params.name}`).then(r => r.json())

		if (data.list.length === 0) return { fallthrough: true } as unknown

		return {
			props: {
				data,
			},
		} as any
	}
</script>

<script lang="ts">
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'
	import Toc from '$lib/Toc.svelte'
	import Collapsible from '$lib/Collapsible.svelte'
	import { skyblockItemNameToItem, skyblockItemToUrl } from '$lib/minecraft/inventory'
	import { cleanId, formatNumberFromUnit, toTitleCase } from '$lib/utils'
	import ListItemWithIcon from '$lib/ListItemWithIcon.svelte'
	import Leaderboards from '$lib/sections/Leaderboards.svelte'
	import Username from '$lib/minecraft/Username.svelte'

	export let data

	$: imageUrl = data.name.startsWith('collection_') ? skyblockItemToUrl(data.name.slice(11)) : null
</script>

<Head title={`${cleanId(data.name)} - SkyBlock Leaderboards`} />
<Header backArrowHref="/leaderboards" />

<main>
	<h1>
		{#if imageUrl}
			<img src={imageUrl} alt={cleanId(data.name.slice(11))} />
		{/if}
		{toTitleCase(cleanId(data.name))}
	</h1>
	{#if data.info}
		<p class="leaderboard-info">
			<span class="leaderboard-info-icon">ⓘ</span>
			<span class="leaderboard-info-content">{@html data.info}</span>
		</p>
	{/if}

	<ol class="leaderboard-profile-list">
		{#each data.list as leaderboardItem}
			<li>
				<span>
					{formatNumberFromUnit(
						leaderboardItem.value,
						data.unit ?? cleanId(data.name).toLowerCase()
					)}
				</span>
				{#if leaderboardItem.player}
					<Username
						player={leaderboardItem.player}
						headType="2d"
						hyperlinkToProfile={leaderboardItem.profileUuid}
					/>
				{:else if leaderboardItem.players}
					{#each leaderboardItem.players as player}
						<span class="leaderboard-profile-player">
							<Username {player} headType="2d" hyperlinkToProfile />
						</span>
					{/each}
				{:else}
					Unknown player
				{/if}
			</li>
		{/each}
	</ol>
</main>

<style>
	h1 > img {
		height: 1em;
		vertical-align: text-top;
	}

	.leaderboard-profile-player {
		margin-right: 0.5em;
	}

	.leaderboard-info {
		background-color: var(--theme-lighter-background);
		padding: 0.5em 0.7em;
		border-radius: 0.5rem;
		width: fit-content;

		box-shadow: 0 0 1em rgba(0, 0, 0, 0.2);
	}
	.leaderboard-info-content {
		font-style: italic;
	}

	.leaderboard-profile-list {
		width: fit-content;
	}
</style>

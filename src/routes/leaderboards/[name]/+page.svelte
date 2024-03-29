<script lang="ts">
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'
	import { skyblockItemToUrl } from '$lib/minecraft/inventory'
	import { cleanId, formatNumberFromUnit, toTitleCase } from '$lib/utils'
	import Username from '$lib/minecraft/Username.svelte'
	import type { MemberLeaderboard, ProfileLeaderboard } from '$lib/APITypes'

	export let data: MemberLeaderboard | ProfileLeaderboard

	$: imageUrl = data.name.startsWith('collection_') ? skyblockItemToUrl(data.name.slice(11)) : null
</script>

<Head title={`${cleanId(data.name)} - SkyBlock Leaderboards`} />
<Header backArrowHref="/leaderboards" />

<main>
	<h1>
		{#if imageUrl}
			<img src={imageUrl} alt={cleanId(data.name.slice(11))} />
		{/if}
		{toTitleCase(cleanId(data.name))} Leaderboard
	</h1>
	{#if data.info}
		<p class="leaderboard-info">
			<span class="leaderboard-info-icon">ⓘ</span>
			<span class="leaderboard-info-content">{@html data.info}</span>
		</p>
	{/if}

	<ol class="leaderboard-profile-list">
		{#each data.list as leaderboardItem, i}
			<li
				value={i > 0 && leaderboardItem.value === data.list[i - 1].value
					? data.list.map(i => i.value).indexOf(leaderboardItem.value) + 1
					: i + 1}
			>
				<span>
					{formatNumberFromUnit(
						leaderboardItem.value,
						data.unit ?? cleanId(data.name).toLowerCase()
					)}
				</span>
				{#if 'player' in leaderboardItem}
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

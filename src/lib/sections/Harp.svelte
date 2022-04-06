<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId, millisecondsToTime, toTitleCase } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

<div class="info-text primary-info-text">
	<p>Claimed Melody's hair: <Emoji value={data.member.harp.claimedMelodysHair ? '✅' : '❌'} /></p>
	{#if data.member.harp.selected}
		<p>
			Selected song:
			<b class="info-text-value">{toTitleCase(cleanId(data.member.harp.selected.id))}</b>
			<span class="harp-selection-timeago">
				{millisecondsToTime(Date.now() - data.member.harp.selected.timestamp)} ago
			</span>
		</p>
	{/if}
</div>
<div class="harp-songs-list">
	{#each data.member.harp.songs as song}
		<div class="harp-song" class:selected-harp-song={song.id === data.member.harp.selected?.id}>
			<h3>{toTitleCase(cleanId(song.id))}</h3>
			<div class="info-text">
				{#if song.completions}
					<p>Completions: <b class="info-text-value">{song.completions}</b></p>
				{/if}
				{#if song.perfectCompletions}
					<p>Perfect completions: <b class="info-text-value">{song.perfectCompletions}</b></p>
				{:else}
					<p>Progress: <b class="info-text-value">{Math.floor(song.progress * 100)}%</b></p>
				{/if}
			</div>
		</div>
	{/each}
</div>

<style>
	p {
		margin: 0;
	}

	.primary-info-text {
		margin: 0.5em 0;
	}

	.info-text {
		color: var(--theme-darker-text);
	}
	.info-text .info-text-value {
		color: var(--theme-main-text);
	}

	.harp-songs-list {
		display: flex;
		flex-wrap: wrap;
		max-width: 40rem;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
	}
	.harp-song {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.75em;
		border-radius: 1em;
		width: 12em;
	}
	.selected-harp-song {
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
</style>

<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId, millisecondsToTime, toTitleCase } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

<div class="info-text primary-info-text">
	<p>In co-op: <Emoji value={data.member.coopInvitation ? '✅' : '❌'} /></p>
	{#if data.member.coopInvitation}
		<p>
			Invited: <span class="info-text-value coop-invited-timeago">
				<b>{millisecondsToTime(Date.now() - data.member.coopInvitation.invitedTimestamp)}</b> ago
			</span>
		</p>
		{#if data.member.coopInvitation.acceptedTimestamp}
			<p>
				Accepted invite: <span class="info-text-value coop-accepted-invite-after">
					after <b>
						{millisecondsToTime(
							data.member.coopInvitation.acceptedTimestamp -
								data.member.coopInvitation.invitedTimestamp
						)}
					</b>
				</span>
			</p>
		{/if}
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
</style>

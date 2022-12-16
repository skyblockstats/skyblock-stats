<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Username from '$lib/minecraft/Username.svelte'
	import { millisecondsToTime } from '$lib/utils'
	export let data: CleanMemberProfile

	$: isProfileCreator = data.member.coopInvitation?.invitedBy?.uuid == data.member.uuid
</script>

{#if data.member.coopInvitation}
	<div class="info-text primary-info-text">
		{#if isProfileCreator}
			<p><b class="info-text-value">Created co-op</b></p>
		{:else}
			<p>
				Invited by {#if data.member.coopInvitation.invitedBy}
					<Username player={data.member.coopInvitation.invitedBy} prefix />
				{:else}
					<b>Unknown player</b>
				{/if}
			</p>
		{/if}
		<p>
			{isProfileCreator ? 'Began creation' : 'Invited'}:
			<span class="info-text-value coop-invited-timeago">
				<b>{millisecondsToTime(Date.now() - data.member.coopInvitation.invitedTimestamp)}</b> ago
			</span>
		</p>
		{#if data.member.coopInvitation.acceptedTimestamp}
			<p>
				{isProfileCreator ? 'Finished creation' : 'Accepted invite'}:
				<span class="info-text-value coop-accepted-invite-after">
					after <b>
						{millisecondsToTime(
							data.member.coopInvitation.acceptedTimestamp -
								data.member.coopInvitation.invitedTimestamp
						)}
					</b>
				</span>
			</p>
		{/if}
	</div>
	<h3>Members</h3>
	{#each data.profile.members.filter(m => !m.left) as player}
		<span class="member">
			<Username {player} headType="2d" hyperlinkToProfile />
		</span>
	{/each}
	{#if data.profile.members.filter(m => m.left).length > 0}
		<h3 class="former-members-title">Former members</h3>
		{#each data.profile.members.filter(m => m.left) as player}
			<span class="member">
				<Username {player} headType="2d" hyperlinkToProfile={data.profile.uuid} />
			</span>
		{/each}
	{/if}
{/if}

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

	.member {
		display: block;
	}
	.former-members-title {
		margin-top: 0.5rem;
	}
</style>

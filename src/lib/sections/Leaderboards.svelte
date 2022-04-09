<script lang="ts">
	import { API_URL } from '$lib/api'

	import type { CleanMemberProfile } from '$lib/APITypes'
	import { cleanId, formatNumberFromUnit } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

{#await fetch(`${API_URL}player/${data.member.uuid}/${data.profile.uuid}/leaderboards`).then( r => r.json() )}
	Loading...
{:then leaderboards}
	<ul>
		{#each leaderboards as leaderboard}
			<li class="leaderboard-item">
				<a href="/leaderboard/{leaderboard.name}" class="leaderboard-item-anchor">
					{leaderboard.positionIndex + 1}) <b>{cleanId(leaderboard.name)}</b>: {formatNumberFromUnit(
						leaderboard.value,
						leaderboard.unit ?? cleanId(leaderboard.name).toLowerCase()
					)}
				</a>
			</li>
		{/each}
	</ul>
{/await}

<style>
	.leaderboard-item-anchor {
		color: inherit;
	}
	.leaderboard-item {
		list-style-type: none;
	}
	ul {
		padding-left: 0;
		margin-top: 0.5em;
	}
</style>

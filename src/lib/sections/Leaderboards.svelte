<script lang="ts">
	import { API_URL } from '$lib/api'

	import type { CleanMemberProfile } from '$lib/APITypes'
	import { cleanId } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

{#await fetch(`${API_URL}player/${data.member.uuid}/${data.profile.uuid}/leaderboards`).then( r => r.json() )}
	Loading...
{:then leaderboards}
	<ul>
		{#each leaderboards as leaderboard}
			<li class="leaderboard-item">
				<a href="/leaderboard/{leaderboard.name}" class="leaderboard-item-anchor">
					{leaderboard.positionIndex}) <b>{cleanId(leaderboard.name)}</b>: {leaderboard.value}
				</a>
			</li>
		{/each}
	</ul>
{/await}

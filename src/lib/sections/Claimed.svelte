<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId, millisecondsToTime, toTitleCase } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

{#if data.member.claimed && data.member.claimed.length > 0}
	<ul>
		{#each data.member.claimed as claimed}
			<li>
				<b class="claimed-item-name">{toTitleCase(cleanId(claimed.name))}</b>
				<span class="claimed-item-timestamp">
					{millisecondsToTime(Date.now() - claimed.timestamp)} ago
				</span>
			</li>
		{/each}
	</ul>
{/if}

<style>
	p {
		margin: 0;
	}

	ul {
		margin: 0.5em 0;
	}

	.claimed-item-timestamp {
		color: var(--theme-darker-text);
	}
</style>

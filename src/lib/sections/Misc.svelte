<script lang="ts">
	import { cleanId, millisecondsToTime } from '$lib/utils'
	import type { CleanMemberProfile, StatItem } from '$lib/APITypes'

	export let data: CleanMemberProfile
</script>

<ul>
	{#each data.member.stats
		.filter(s => s.category === 'misc')
		.sort((a, b) => b.value - a.value) as stat}
		<li>
			<span class="stat-name">{cleanId(stat.categorizedName)}:</span>
			<span class="stat-value">
				{#if stat.unit === 'time'}
					{millisecondsToTime(stat.value)}
				{:else}
					{stat.value.toLocaleString()}
				{/if}
			</span>
		</li>
	{/each}
</ul>

<style>
	li {
		position: relative;
	}
	ul {
		margin-top: 0.5em;
		padding-left: 1em;
	}
</style>

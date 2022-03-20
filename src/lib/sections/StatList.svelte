<!-- 
	@component

	A sorted list of a user's stats, with the total sometimes being at the top.
-->
<script lang="ts">
	import { cleanId, millisecondsToTime } from '$lib/utils'
	import type { StatItem } from '$lib/APITypes'

	export let stats: StatItem[]
</script>

<ul>
	{#each stats.sort((a, b) => b.value - a.value) as stat}
		<li class:total-stat={stat.categorizedName === 'total'}>
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
	.total-stat .stat-name {
		color: var(--theme-darker-text);
	}
	.total-stat .stat-value {
		font-weight: bold;
	}

	.total-stat {
		list-style-type: none;
		padding: 0 0 0.5em 0;
		right: 1em;
	}
	li {
		position: relative;
	}
	ul {
		margin-top: 0.5em;
		padding-left: 1em;
	}
</style>

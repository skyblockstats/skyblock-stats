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
	{#each stats as stat}
		<li class:total-stat={stat.categorizedName === 'total'}>
			<span class="stat-name">{cleanId(stat.categorizedName)}</span>:
			{#if stat.unit === 'time'}
				{millisecondsToTime(stat.value)}
			{:else}
				{stat.value.toLocaleString()}
			{/if}
		</li>
	{/each}
</ul>

<style>
	.total-stat .stat-name {
		font-weight: bold;
	}

	.total-stat {
		font-size: 1.2em;
		list-style-type: none;
		position: relative;
		right: 1em;
		bottom: 0.2em;
	}

	ul {
		margin-top: 0.5em;
	}
</style>

<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import { cleanId, toRomanNumerals } from '$lib/utils'

	export let data: CleanMemberProfile

	let zonesVisitedCount = data.member.zones ? data.member.zones?.filter(z => z.visited).length : 0
</script>

{#if data.member.zones}
	<p class="zones-visited-text">
		<span class="zones-visited-number">
			<b>{zonesVisitedCount}</b>/{data.member.zones.length} zones visited
		</span>
	</p>
	<ul>
		{#each data.member.zones.filter(z => z.visited) as zone}
			<li>{cleanId(zone.name)}</li>
		{/each}
		{#each data.member.zones.filter(z => !z.visited) as zone}
			<li class="unvisited-zone">{cleanId(zone.name)}</li>
		{/each}
	</ul>
{/if}

<style>
	.zones-visited-text {
		color: var(--theme-darker-text);
	}
	.zones-visited-number {
		color: var(--theme-main-text);
	}
	.unvisited-zone {
		opacity: 0.5;
	}
</style>

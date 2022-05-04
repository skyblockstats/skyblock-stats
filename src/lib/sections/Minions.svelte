<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import { cleanId, toRomanNumerals } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

<p class="unique-minions-text">
	Unique minions:
	<span class="minions-fraction">
		<b>{data.profile.minionCount}</b>/{data.profile.maxUniqueMinions}
	</span>
</p>
<table>
	{#each data.profile.minions as minion}
		<tr>
			<th>{cleanId(minion.name)}</th>
			{#each minion.levels as unlocked, i}
				<td class="minion-table-item" class:unlocked>
					{toRomanNumerals(i + 1)}
				</td>
			{/each}
		</tr>
	{/each}
</table>

<style>
	.unique-minions-text {
		color: var(--theme-darker-text);
	}
	.minions-fraction {
		color: var(--theme-main-text);
	}
	.minion-table-item:not(.unlocked) {
		opacity: 0.2;
	}
	.minion-table-item.unlocked {
		color: #3e3;
	}
</style>

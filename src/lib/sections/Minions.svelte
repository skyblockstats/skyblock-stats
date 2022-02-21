<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import { cleanId, toRomanNumerals } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

<p class="unique-minions-text">
	Unique minions:
	<span class="minions-fraction">
		<b>{data.profile.minion_count}</b>/{data.profile.maxUniqueMinions}
	</span>
</p>
<table>
	{#each data.profile.minions as minion}
		<tr>
			<th>{cleanId(minion.name)}</th>
			{#each minion.levels as unlocked, i}
				<td class="minions-table" class:unlocked>
					{toRomanNumerals(i)}
				</td>
			{/each}
		</tr>
	{/each}
</table>

<!-- 
<p class="darker-text">Unique minions: <span class="main-text"><b>{{ data.profile.minion_count }}</b>/{{ getConstants().max_minions }}</span></p>
<table>
{%- for minion in data.profile.minions -%}
    <tr>
        <th>{{ minion.name|clean }}</th>
        {%- for unlocked in minion.levels -%}
        <td class="minions-table-{% if unlocked %}unlocked{% else %}locked{% endif %}">{{ loop.index|romanNumerals }}</td>
        {%- endfor -%}
    </tr>
{%- endfor -%}
</table> -->
<style>
	.unique-minions-text {
		color: var(--theme-darker-text);
	}
	.minions-fraction {
		color: var(--theme-main-text);
	}
	.minions-table:not(.unlocked) {
		opacity: 0.2;
	}
	.minions-table.unlocked {
		color: #3e3;
	}
</style>

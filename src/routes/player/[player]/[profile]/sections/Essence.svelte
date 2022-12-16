<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import { cleanId, toTitleCase } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

{#if data.member.essence.types.length > 0}
	<ul>
		{#each data.member.essence.types as essenceType}
			<li>
				{toTitleCase(cleanId(essenceType.id))}:
				<b class="essence-type-amount">{essenceType.amount.toLocaleString()}</b>
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
</style>

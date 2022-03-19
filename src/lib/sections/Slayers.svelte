<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import { cleanId, toRomanNumerals } from '$lib/utils'

	export let data: CleanMemberProfile
</script>

{#if data.member.slayers}
	<div class="slayer-info-text">
		<p>Xp: <b>{data.member.slayers.xp}</b></p>
		<p>Kills: <b>{data.member.slayers.kills}</b></p>
	</div>
	<div class="slayers-list">
		{#each data.member.slayers.bosses as slayer}
			<div class="individual-slayer-data">
				<h3>{slayer.name ? cleanId(slayer.name) : cleanId(slayer.raw_name)}</h3>
				<div class="slayer-info-text">
					<p>Xp: <b>{slayer.xp.toLocaleString()}</b></p>
					<p>Level: <b>{slayer.level}</b></p>
				</div>
				<table>
					<tr>
						{#each slayer.tiers as tier}
							<th>Tier {toRomanNumerals(tier.tier)}</th>
						{/each}
					</tr>
					<tr>
						{#each slayer.tiers as tier}
							<td class="slayer-tier-kills">
								{tier.kills.toLocaleString()}
							</td>
						{/each}
					</tr>
				</table>
			</div>
		{/each}
	</div>
{/if}

<style>
	p {
		margin: 0;
	}

	.slayer-tier-kills {
		text-align: center;
	}

	.slayer-info-text {
		color: var(--theme-darker-text);
	}
	.slayer-info-text b {
		color: var(--theme-main-text);
	}

	.individual-slayer-data {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.75em;
		border-radius: 1em;
	}

	.slayers-list {
		display: flex;
		flex-wrap: wrap;
		max-width: 40rem;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
	}
</style>

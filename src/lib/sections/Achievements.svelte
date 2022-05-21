<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Tooltip from '$lib/Tooltip.svelte'
	export let data: CleanMemberProfile
</script>

{#if data.member.achievements}
	<h3>
		Tiered
		<span class="achievement-count">
			({data.member.achievements.tiered.filter(a => a.value).length}/{data.member.achievements
				.tiered.length})
		</span>
	</h3>
	<ul>
		{#each data.member.achievements.tiered as achievement}
			<li class="achievement">
				<Tooltip>
					<span slot="tooltip">
						{achievement.description}
					</span>

					{#if achievement.value}
						<span>
							{achievement.name}: <b>{achievement.value}</b>
						</span>
					{:else}
						<span class="achievement-locked">
							{achievement.name}
						</span>
					{/if}
				</Tooltip>
			</li>
		{/each}
	</ul>

	<h3>
		Challenge
		<span class="achievement-count">
			({data.member.achievements.challenge.filter(a => a.unlocked).length}/{data.member.achievements
				.challenge.length})
		</span>
	</h3>
	<ul>
		{#each data.member.achievements.challenge as achievement}
			<li class="achievement">
				<Tooltip>
					<span slot="tooltip">
						{achievement.description}
					</span>

					{#if achievement.unlocked}
						<span>
							{achievement.name}
						</span>
					{:else}
						<span class="achievement-locked">
							{achievement.name}
						</span>
					{/if}
				</Tooltip>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		margin: 0;
		padding-left: 1em;
	}

	.achievement-locked {
		opacity: 0.5;
	}

	.achievement-count {
		color: var(--theme-darker-text);
		font-weight: normal;
	}
</style>

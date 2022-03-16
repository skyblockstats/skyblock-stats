<script lang="ts">
	import Tooltip from '$lib/Tooltip.svelte'
	import { cleanId, formatNumber } from '$lib/utils'

	const skillImages = {
		runecrafting: '/skill-icons/runecrafting.webp',
		alchemy: '/skill-icons/herblore.webp',
		combat: '/skill-icons/attack.webp',
		enchanting: '/skill-icons/magic.webp',
		foraging: '/skill-icons/woodcutting.webp',
		mining: '/skill-icons/mining.webp',
		taming: '/skill-icons/hunter.webp',
		farming: '/skill-icons/farming.webp',
		fishing: '/skill-icons/fishing.webp',
		carpentry: '/skill-icons/construction.webp',
	}

	export let data
</script>

<ul>
	{#each data.member.skills as skill}
		<li
			class="list-item-with-icon"
			style="background: url({skillImages[skill.name]}) 0 0/1em no-repeat"
		>
			<Tooltip>
				<span slot="tooltip">
					{#if skill.levelXpRequired !== null}
						{Math.round((skill.levelXp / skill.levelXpRequired) * 100)}% to next level, {Math.round(
							skill.levelXp
						).toLocaleString()}/{formatNumber(skill.levelXpRequired, 3)} xp
					{:else}
						{Math.round(skill.levelXp).toLocaleString()} extra xp
					{/if}
				</span>
				<span>
					{cleanId(skill.name)}
					<span class="skill-level" class:skill-maxed={skill.level === skill.maxLevel}>
						{skill.level}
					</span>
				</span>
			</Tooltip>
		</li>
	{/each}
</ul>

<style>
	.skill-level {
		opacity: 0.9;
	}
	.skill-maxed {
		color: #0e0;
		opacity: 1;
	}
	.list-item-with-icon {
		list-style: none;
		padding-left: 1.2em;
		position: relative;
		right: 1.2em;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}

	ul {
		margin-top: 0;
		display: flex;
		flex-wrap: wrap;
		max-width: 30em;
	}
	ul > li {
		width: 10em;
		margin: 0.25em 0.25em 0 0;
	}
</style>

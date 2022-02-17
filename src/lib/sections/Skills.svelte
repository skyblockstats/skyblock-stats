<script lang="ts">
	import Tooltip from '$lib/Tooltip.svelte'
	import { cleanId, formatNumber } from '$lib/utils'

	const skillImages = {
		runecrafting: 'https://cdn.matdoes.dev/images/runescape/runecrafting.webp',
		alchemy: 'https://cdn.matdoes.dev/images/runescape/herblore.webp',
		combat: 'https://cdn.matdoes.dev/images/runescape/attack.webp',
		enchanting: 'https://cdn.matdoes.dev/images/runescape/magic.webp',
		foraging: 'https://cdn.matdoes.dev/images/runescape/woodcutting.webp',
		mining: 'https://cdn.matdoes.dev/images/runescape/mining.webp',
		taming: 'https://cdn.matdoes.dev/images/runescape/hunter.webp',
		farming: 'https://cdn.matdoes.dev/images/runescape/farming.webp',
		fishing: 'https://cdn.matdoes.dev/images/runescape/fishing.webp',
		carpentry: 'https://cdn.matdoes.dev/images/runescape/construction.webp',
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
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 2em;
	}
	ul > li {
		width: 10em;
	}
</style>

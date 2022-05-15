<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Emoji from '$lib/Emoji.svelte'
	import ListItemWithIcon from '$lib/ListItemWithIcon.svelte'
	import { cleanId, skyblockTime } from '$lib/utils'

	export let data: CleanMemberProfile

	$: bagData = data.member.accessoryBagUpgrades
</script>

<span class="accessory-bag-upgrades">
	<h3>Upgrades</h3>
	<div class="accessory-bag-info-text">
		<p>Purchased: <b>{bagData.upgrades.purchased}</b></p>
		<p>Coins spent: <b>{bagData.upgrades.coinsSpent.toLocaleString()}</b></p>
		<p>Extra slots: <b>{bagData.upgrades.extraSlots}</b></p>
	</div>

	<h3>Powers</h3>
	{#if bagData.powers.selected}
		<p class="accessory-bag-info-text">
			Selected: <b>{cleanId(bagData.powers.selected)}</b>
		</p>
	{/if}
	<ul>
		{#each bagData.powers.list as power}
			<li>
				{#if bagData.powers.selected === power}
					<b>{cleanId(power)}</b>
				{:else}
					{cleanId(power)}
				{/if}
			</li>
		{/each}
	</ul>

	<div class="tuning-templates">
		{#each bagData.tuningTemplates as template, template_index}
			<div class="tuning-template">
				<h3>Template #{template_index + 1}</h3>
				<div class="accessory-bag-info-text">
					{#each Object.entries(template) as [statName, statValue]}
						<p>{cleanId(statName)}: <b>{statValue}</b></p>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</span>

<style>
	p,
	ul {
		margin: 0;
	}
	ul {
		padding-left: 1.5em;
	}
	h3 {
		margin: 0.5em 0 0 0;
	}

	.accessory-bag-info-text {
		color: var(--theme-darker-text);
	}
	.accessory-bag-info-text b {
		color: var(--theme-main-text);
	}

	.tuning-templates {
		display: flex;
		flex-wrap: wrap;
		max-width: 40rem;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
		margin-top: 1rem;
	}
	.tuning-template {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.75em;
		border-radius: 1em;
	}
	.tuning-template h3 {
		margin: 0;
	}

	.accessory-bag-upgrades {
		/* width: 5rem; */
	}
	@media only screen and (min-width: 1160px) {
		.accessory-bag-upgrades {
			display: inline-grid;
			position: relative;
			top: -1.5em;
			left: 0.5em;
		}
	}
</style>

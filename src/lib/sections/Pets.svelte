<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import { cleanId, toRomanNumerals, toTitleCase } from '$lib/utils'

	export let data: CleanMemberProfile

	// we convert it to a set to remove duplicates
	const petsAcquiredCount = new Set(data.member.pets.list.map(p => p.id)).size
	const totalPetsCount = data.member.pets.missingIds.length + petsAcquiredCount
</script>

{#if data.member.zones}
	<p class="zones-visited-text">
		Pets acquired:
		<span class="zones-visited-number">
			<b>{petsAcquiredCount}</b>/{totalPetsCount}
		</span>
	</p>
	<div class="pets-list">
		{#each data.member.pets.list as pet}
			<div class="individual-pet-data">
				<h3>{cleanId(pet.id.toLowerCase())}</h3>
				<p>Level: <b>{pet.level.toLocaleString()}</b></p>
				<p>Tier: <b>{toTitleCase(pet.tier)}</b></p>
				{#if pet.item}
					<p>Item: <b>{pet.item.display.name}</b></p>
				{/if}
			</div>
		{/each}
	</div>
	{#if data.member.pets.missingIds.length > 0}
		<h3 class="missing-pets-title">Missing</h3>
		<ul>
			{#each data.member.pets.missingIds as petId}
				<li class="missing-pet">{toTitleCase(cleanId(petId.toLowerCase()))}</li>
			{/each}
		</ul>
	{/if}
{/if}

<style>
	p {
		margin: 0;
	}
	.zones-visited-text {
		color: var(--theme-darker-text);
		margin: 0.5em 0;
	}
	.zones-visited-number {
		color: var(--theme-main-text);
	}
	.missing-pet {
		opacity: 0.5;
	}
	.individual-pet-data {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.75em;
		border-radius: 1em;
		width: 9rem;
	}

	.pets-list {
		display: flex;
		flex-wrap: wrap;
		max-width: 40rem;
		column-gap: 0.5rem;
		row-gap: 0.5rem;
	}

	.missing-pets-title {
		margin-top: 1rem;
	}

	ul {
		padding-left: 1em;
		margin: 0;
	}
</style>

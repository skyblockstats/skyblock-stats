<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { loadPack } from '$lib/packs'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player
		const profile: string = params.profile
		const data = await fetch(`${API_URL}player/${player}/${profile}?customization=true`).then(r =>
			r.json()
		)

		const packName = params.pack ?? data?.customization?.pack

		let pack = await loadPack(packName)

		return {
			props: {
				data,
				pack,
			},
		}
	}
</script>

<script lang="ts">
	import { inventoryIconMap, skyblockItemToUrl } from '$lib/minecraft/inventory'
	import Leaderboards from '$lib/sections/Leaderboards.svelte'
	import Inventories from '$lib/sections/Inventories.svelte'
	import Collections from '$lib/sections/Collections.svelte'
	import { chooseDefaultBackground } from '$lib/backgrounds'
	import BackgroundImage from '$lib/BackgroundImage.svelte'
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Username from '$lib/minecraft/Username.svelte'
	import StatList from '$lib/sections/StatList.svelte'
	import Infobox from '$lib/sections/Infobox.svelte'
	import Minions from '$lib/sections/Minions.svelte'
	import Slayers from '$lib/sections/Slayers.svelte'
	import type { MatcherFile } from 'skyblock-assets'
	import Collapsible from '$lib/Collapsible.svelte'
	import Skills from '$lib/sections/Skills.svelte'
	import { generateInfobox } from '$lib/profile'
	import Zones from '$lib/sections/Zones.svelte'
	import Armor from '$lib/sections/Armor.svelte'
	import Bank from '$lib/sections/Bank.svelte'
	import Header from '$lib/Header.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId } from '$lib/utils'
	import Head from '$lib/Head.svelte'
	import Toc from '$lib/Toc.svelte'

	export let data: CleanMemberProfile
	export let pack: MatcherFile

	let categories: string[] = []
	function setCategories() {
		categories = []
		if (data.member.stats?.find(s => s.category === 'deaths')) categories.push('deaths')
		if (data.member.stats?.find(s => s.category === 'kills')) categories.push('kills')
		if (data.member.stats?.find(s => s.category === 'auctions')) categories.push('auctions')
		if (data.member.stats?.find(s => s.category === 'fishing')) categories.push('fishing')
		if (data.member.stats?.find(s => s.category === 'races')) categories.push('races')
		categories.push('misc')
		categories.push('minions')
		if (data.member.slayers) categories.push('slayers')
		categories.push('zones')
		if (data.member.collections && data.member.collections.length > 0)
			categories.push('collections')
		if (data.profile.bank.balance !== undefined) categories.push('bank')
		categories.push('leaderboards')
	}

	$: [data, setCategories()]
	$: backgroundUrl = data.customization?.backgroundUrl ?? chooseDefaultBackground(data.member.uuid)
	$: showingInventories =
		data.member.inventories?.inventory || data.member.inventories?.personal_vault
</script>

{#if backgroundUrl}
	<BackgroundImage url={backgroundUrl} />
{/if}

<Head
	title="{data.member.username}'s SkyBlock profile ({data.member.profileName})"
	description={generateInfobox(data).join('\n')}
	metaTitle={(data.member.rank.name ? `[${data.member.rank.name}] ` : '') +
		`${data.member.username}\'s SkyBlock profile (${data.member.profileName})`}
/>
<Header
	backArrowHref="/player/{data.member.username}"
	blurred={data.customization?.blurBackground ?? false}
/>

<main>
	{#if data.customization?.blurBackground && backgroundUrl}
		<div class="blurred-background-container-container">
			<div class="blurred-background-container">
				<img class="blurred-background" src={backgroundUrl} alt="Background" />
			</div>
		</div>
	{/if}

	<h1>
		<!-- this is weird like this so svelte doesn't add whitespace -->
		<Username player={data.member} headType="3d" />{#if data.customization?.emoji}<span
				class="profile-emoji"><Emoji value={data.customization.emoji} /></span
			>
		{/if}
		({data.member.profileName})
	</h1>

	<Infobox {data} />

	<Toc {categories} />

	{#if data.member.skills && data.member.skills.length > 0}
		<section id="skills" class="profile-skills">
			<h2>Skills</h2>
			<Skills {data} />
		</section>
	{/if}

	<br />

	<div>
		<div id="categories">
			{#if data.member.inventories?.armor}
				<section id="armor" class:armor-float={showingInventories}>
					<h2>Armor</h2>
					<Armor {data} {pack} />
				</section>
			{/if}
			{#if showingInventories}
				<section id="inventories">
					<h2>
						{#if data.member.inventories?.inventory}
							Inventories
						{:else}
							<img
								class="inventory-tab-icon"
								loading="lazy"
								src={skyblockItemToUrl(inventoryIconMap.personal_vault, pack)}
								alt={cleanId('personal_vault')}
							/>
							Personal Vault
						{/if}
					</h2>
					<Inventories {data} {pack} />
				</section>
			{/if}
			{#if data.member.stats}
				{#each categories as category}
					{#if data.member.stats?.find(s => s.category === category)}
						<section>
							<Collapsible id={category}>
								<h2 slot="title">{cleanId(category)}</h2>
								<StatList stats={data.member.stats.filter(s => s.category === category)} />
							</Collapsible>
						</section>
					{/if}
				{/each}
			{/if}
			<section>
				<Collapsible id="minions">
					<h2 slot="title">Minions</h2>
					<Minions {data} />
				</Collapsible>
			</section>
			{#if categories.includes('slayers')}
				<section>
					<Collapsible id="slayers">
						<h2 slot="title">Slayers</h2>
						<Slayers {data} />
					</Collapsible>
				</section>
			{/if}
			<section>
				<Collapsible id="zones">
					<h2 slot="title">Zones</h2>
					<Zones {data} />
				</Collapsible>
			</section>
			{#if categories.includes('collections')}
				<section>
					<Collapsible id="collections">
						<h2 slot="title">Collections</h2>
						<Collections {data} {pack} />
					</Collapsible>
				</section>
			{/if}
			{#if categories.includes('bank')}
				<section>
					<Collapsible id="bank">
						<h2 slot="title">Bank</h2>
						<Bank {data} />
					</Collapsible>
				</section>
			{/if}
			<section>
				<Collapsible id="leaderboards">
					<h2 slot="title">Leaderboards</h2>
					<Leaderboards {data} />
				</Collapsible>
			</section>
		</div>
	</div>
</main>

<style>
	main {
		position: relative;
	}
	.profile-emoji {
		display: inline;
	}
	.profile-skills {
		display: inline-block;
		position: absolute;
		margin: 0.75em 1em 1em 1em;
	}

	#armor.armor-float {
		float: left;
	}

	#armor {
		margin-right: 2em;
		height: 16em;
	}

	#inventories {
		display: inline-block;
		min-height: 16em;
	}

	section {
		max-width: fit-content;
	}

	.blurred-background-container-container {
		position: absolute;
		width: 47rem;
		height: calc(100% + 1em);
		z-index: -9;
		overflow: hidden;
		clip: rect(-1em, auto, auto, -2em);
	}
	.blurred-background {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -10;
		object-fit: cover;
		background-blend-mode: overlay;
		filter: blur(1em) brightness(0.6);
	}
	@media only screen and (max-width: 1400px) {
		.blurred-background-container-container {
			left: calc(5em + 5%);
			width: 90%;
			clip: rect(-1.7em, auto, auto, -10em);
		}
		main {
			margin-top: 0.75em;
		}
	}
	@media only screen and (max-width: 1040px) {
		.profile-skills {
			position: unset;
			display: block;
			width: max-content;
		}
		.blurred-background-container-container {
			left: 0 !important;
			width: 100vw !important;
		}
	}
</style>

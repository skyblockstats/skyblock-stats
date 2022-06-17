<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { loadPack } from '$lib/packs'
	import { fetchApi } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player
		const profile: string = params.profile
		const data: CleanMemberProfile = await fetchApi(
			`player/${player}/${profile}?customization=true`,
			fetch
		).then(async r => {
			const text = await r.text()
			try {
				return JSON.parse(text)
			} catch (e) {
				throw new Error(`Invalid JSON: ${text}`)
			}
		})

		if (!data.member) {
			return {
				status: 404,
				error: 'Unknown profile',
			}
		}

		if (data.member.username !== player) {
			return {
				redirect: `/player/${data.member.username}/${data.profile.name}`,
				status: 302,
			} as any
		}
		if (!data.member.left && data.profile.name !== profile) {
			return {
				redirect: `/player/${data.member.username}/${data.profile.name}`,
				status: 302,
			} as any
		}

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
	import FarmingContests from '$lib/sections/FarmingContests.svelte'
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
	import Claimed from '$lib/sections/Claimed.svelte'
	import Collapsible from '$lib/Collapsible.svelte'
	import Skills from '$lib/sections/Skills.svelte'
	import { generateInfobox } from '$lib/profile'
	import Zones from '$lib/sections/Zones.svelte'
	import Armor from '$lib/sections/Armor.svelte'
	import Harp from '$lib/sections/Harp.svelte'
	import Pets from '$lib/sections/Pets.svelte'
	import Coop from '$lib/sections/Coop.svelte'
	import Bank from '$lib/sections/Bank.svelte'
	import Header from '$lib/Header.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId } from '$lib/utils'
	import Head from '$lib/Head.svelte'
	import Toc from '$lib/Toc.svelte'
	import Achievements from '$lib/sections/Achievements.svelte'
	import Essence from '$lib/sections/Essence.svelte'

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
		if (data.member.stats?.find(s => s.category === 'misc')) categories.push('misc')
		if (data.member.minions.some(m => m.levels.some(l => l))) categories.push('minions')
		if (data.member.slayers && data.member.slayers.xp > 0) categories.push('slayers')
		categories.push('zones')
		if (data.member.collections && data.member.collections.length > 0)
			categories.push('collections')
		if (data.profile.bank.balance !== undefined) categories.push('bank')
		if (data.member.harp.selected !== null) categories.push('harp')
		if (data.member.essence.types.length > 0) categories.push('essence')
		if (data.member.claimed && data.member.claimed.length > 0) categories.push('claimed')
		if (data.member.pets.list.length > 0) categories.push('pets')
		if (data.member.farmingContests.list.length > 0) categories.push('farming_contests')
		if (data.member.coopInvitation) categories.push('co-op')
		if (data.member.achievements) categories.push('achievements')
		categories.push('leaderboards')
	}

	$: [data, setCategories()]
	$: backgroundUrl = data.customization?.backgroundUrl ?? chooseDefaultBackground(data.member.uuid)
	$: showingInventories =
		data.member.inventories?.inventory || data.member.inventories?.personal_vault

	$: profileName = data.member.left ? 'Removed' : data.member.profileName
</script>

{#if backgroundUrl}
	<BackgroundImage url={backgroundUrl} />
{/if}

<Head
	title="{data.member.username}'s SkyBlock profile ({profileName})"
	description={generateInfobox(data).join('\n')}
	metaTitle={(data.member.rank.name ? `[${data.member.rank.name}] ` : '') +
		`${data.member.username}\'s SkyBlock profile (${profileName})`}
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
		({profileName})
	</h1>

	<Infobox {data} />

	<Toc {categories} />

	{#if data.member.skills && data.member.skills.list.length > 0}
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
			{#if categories.includes('minions')}
				<section>
					<Collapsible id="minions">
						<h2 slot="title">Minions</h2>
						<Minions {data} />
					</Collapsible>
				</section>
			{/if}
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
			{#if categories.includes('harp')}
				<section>
					<Collapsible id="harp">
						<h2 slot="title">Harp</h2>
						<Harp {data} />
					</Collapsible>
				</section>
			{/if}
			{#if categories.includes('essence')}
				<section>
					<Collapsible id="essence">
						<h2 slot="title">Essence</h2>
						<Essence {data} />
					</Collapsible>
				</section>
			{/if}
			{#if categories.includes('claimed')}
				<section>
					<Collapsible id="claimed">
						<h2 slot="title">Claimed</h2>
						<Claimed {data} />
					</Collapsible>
				</section>
			{/if}
			{#if categories.includes('pets')}
				<section>
					<Collapsible id="pets">
						<h2 slot="title">Pets</h2>
						<Pets {data} />
					</Collapsible>
				</section>
			{/if}
			{#if categories.includes('farming_contests')}
				<section>
					<Collapsible id="farming-contests">
						<h2 slot="title">Farming Contests</h2>
						<FarmingContests {data} />
					</Collapsible>
				</section>
			{/if}
			{#if categories.includes('co-op')}
				<section>
					<Collapsible id="co-op">
						<h2 slot="title">Co-op</h2>
						<Coop {data} />
					</Collapsible>
				</section>
			{/if}
			{#if categories.includes('achievements')}
				<section>
					<Collapsible id="achievements">
						<h2 slot="title">Achievements</h2>
						<Achievements {data} />
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

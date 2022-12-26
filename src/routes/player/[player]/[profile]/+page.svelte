<script lang="ts">
	import { inventoryIconMap, skyblockItemToUrl } from '$lib/minecraft/inventory'
	import FarmingContests from './sections/FarmingContests.svelte'
	import Leaderboards from './sections/Leaderboards.svelte'
	import Achievements from './sections/Achievements.svelte'
	import Inventories from './sections/Inventories.svelte'
	import Collections from './sections/Collections.svelte'
	import { chooseDefaultBackground } from '$lib/backgrounds'
	import BackgroundImage from '$lib/BackgroundImage.svelte'
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Username from '$lib/minecraft/Username.svelte'
	import StatList from './sections/StatList.svelte'
	import Auctions from './sections/Auctions.svelte'
	import Infobox from './sections/Infobox.svelte'
	import Minions from './sections/Minions.svelte'
	import Essence from './sections/Essence.svelte'
	import Slayers from './sections/Slayers.svelte'
	import type { MatcherFile } from 'skyblock-assets'
	import Claimed from './sections/Claimed.svelte'
	import Collapsible from '$lib/Collapsible.svelte'
	import Skills from './sections/Skills.svelte'
	import { generateInfobox } from '$lib/profile'
	import Zones from './sections/Zones.svelte'
	import Armor from './sections/Armor.svelte'
	import Harp from './sections/Harp.svelte'
	import Pets from './sections/Pets.svelte'
	import Coop from './sections/Coop.svelte'
	import Bank from './sections/Bank.svelte'
	import type { PageData } from './$types'
	import Header from '$lib/Header.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId } from '$lib/utils'
	import Head from '$lib/Head.svelte'
	import Toc from '$lib/Toc.svelte'
	import Main from '../Main.svelte'

	export let data: PageData & CleanMemberProfile

	export let pack: MatcherFile = data.pack

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

<Main blurred={data.customization?.blurBackground} {backgroundUrl}>
	<h1>
		<!-- this is weird like this so svelte doesn't add whitespace -->
		<Username player={data.member} headType="3d" />{#if data.customization?.emoji}<span
				class="profile-emoji"><Emoji value={data.customization.emoji} /></span
			>
		{/if}
		({profileName})
	</h1>

	<!-- technoblade -->
	{#if data.member.uuid == 'b876ec32e396476ba1158438d83c67d4'}
		<div class="technoblade-never-dies">
			<a href="https://www.curesarcoma.org">Technoblade never dies. <Emoji value="🕊️" /></a>
		</div>
	{/if}

	<Infobox {data} />

	<Toc {categories} />

	{#if data.member.skills && data.member.skills.list.length > 0}
		<section id="skills" class="profile-skills">
			<div class="skill-heading-container">
				<h2 class="inline-heading">Skills</h2>
				<span class="average-skill">
					{data.member.skills.average} avg.
				</span>
			</div>
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
								{#if category == 'auctions'}
									<Auctions
										stats={data.member.stats.filter(s => s.category === category)}
										{data}
										{pack}
									/>
								{:else}
									<StatList stats={data.member.stats.filter(s => s.category === category)} />
								{/if}
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
</Main>

<style>
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

	@media only screen and (max-width: 1040px) {
		.profile-skills {
			position: unset;
			display: block;
			width: max-content;
		}
	}

	.skill-heading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
	}
	.skill-heading-container h2 {
		display: inline-block;
		margin-right: 0.4em;
		margin-bottom: 0;
	}
	.average-skill {
		color: var(--theme-darker-text);
		font-size: 0.9rem;
	}

	.technoblade-never-dies {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.75em;
		border-radius: 1em;

		width: fit-content;
		position: relative;
		top: -1em;
	}
</style>

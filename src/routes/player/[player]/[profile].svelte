<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player
		const profile: string = params.profile
		const data = await fetch(`${API_URL}player/${player}/${profile}?customization=true`).then(r =>
			r.json()
		)

		const pack = params.pack ?? data?.customization?.pack

		return {
			props: {
				data,
				pack,
			},
		}
	}
</script>

<script lang="ts">
	import Leaderboards from '$lib/sections/Leaderboards.svelte'
	import Inventories from '$lib/sections/Inventories.svelte'
	import Collections from '$lib/sections/Collections.svelte'
	import Username from '$lib/minecraft/Username.svelte'
	import StatList from '$lib/sections/StatList.svelte'
	import Infobox from '$lib/sections/Infobox.svelte'
	import Minions from '$lib/sections/Minions.svelte'
	import Collapsible from '$lib/Collapsible.svelte'
	import Skills from '$lib/sections/Skills.svelte'
	import { generateInfobox } from '$lib/profile'
	import Zones from '$lib/sections/Zones.svelte'
	import Armor from '$lib/sections/Armor.svelte'
	import Header from '$lib/Header.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId } from '$lib/utils'
	import Head from '$lib/Head.svelte'
	import Toc from '$lib/Toc.svelte'

	import type { CleanMemberProfile } from '$lib/APITypes'
	import { onDestroy } from 'svelte'

	export let data: CleanMemberProfile
	export let pack: string

	const categories = [
		'deaths',
		'kills',
		'auctions',
		'fishing',
		'races',
		'misc',
		'minions',
		'zones',
		'collections',
		'leaderboards',
	]

	// cursed svelte :D
	$: bodyStyle = data.customization?.backgroundUrl
		? `<style>:root{--background:url(${data.customization.backgroundUrl})}</style>`
		: ''

	// get rid of the body style when we leave the page
	// not doing this will sometimes cause the background to stay
	onDestroy(() => {
		bodyStyle = ''
	})
</script>

<svelte:head>
	{@html bodyStyle}
</svelte:head>

<Head
	title="{data.member.username}'s SkyBlock profile ({data.member.profileName})"
	description={generateInfobox(data).join('\n')}
	metaTitle={(data.member.rank.name ? `[${data.member.rank.name}] ` : '') +
		`${data.member.username}\'s SkyBlock profile (${data.member.profileName})`}
/>
<Header backArrowHref="/player/{data.member.username}" />

<main>
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
				<section id="armor" class:armor-float={data.member.inventories.inventory}>
					<h2>Armor</h2>
					<Armor {data} {pack} />
				</section>
			{/if}
			{#if data.member.inventories?.inventory}
				<section id="inventories">
					<h2>Inventories</h2>
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
			<section>
				<Collapsible id="zones">
					<h2 slot="title">Zones</h2>
					<Zones {data} />
				</Collapsible>
			</section>
			<section>
				<Collapsible id="collections">
					<h2 slot="title">Collections</h2>
					<Collections {data} />
				</Collapsible>
			</section>
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
		margin-bottom: 0.5em;
	}
</style>

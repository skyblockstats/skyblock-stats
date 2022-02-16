<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player
		const profile: string = params.profile
		const data = await fetch(`${API_URL}player/${player}/${profile}?customization=true`).then(r =>
			r.json()
		)

		const constants = await fetch('/constants.json').then(r => r.json())

		return {
			props: {
				data,
				constants,
			},
		}
	}
</script>

<script lang="ts">
	import Infobox from '$lib/sections/Infobox.svelte'
	import { generateInfobox } from '$lib/profile'
	import Username from '$lib/Username.svelte'
	import Header from '$lib/Header.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId } from '$lib/utils'
	import Head from '$lib/Head.svelte'
	import Toc from '$lib/Toc.svelte'
	import Skills from '$lib/sections/Skills.svelte'

	export let data
	export let constants

	const categories = [
		'skills',
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
	$: bodyStyle = `<style>:root{--background:url(${data.customization.backgroundUrl})}</style>`
</script>

<svelte:head>
	{@html bodyStyle}
</svelte:head>

<Head
	title="{data.member.username}'s SkyBlock profile ({data.member.profileName})"
	description={generateInfobox(data, constants, { meta: true }).join('\n')}
	metaTitle={(data.member.rank.name ? `[${data.member.rank.name}] ` : '') +
		`${data.member.username}\'s SkyBlock profile (${data.member.profileName})`}
/>
<Header backArrowHref="/player/{data.member.username}" />

<main>
	<h1>
		<Username player={data.member} headType="3d" />
		{#if data.customization?.emoji}
			<span class="profile-emoji"><Emoji value={data.customization.emoji} /></span>
		{/if}
		({data.member.profileName})
	</h1>

	<Infobox {data} {constants} />

	<Toc {categories} />

	{#if data.member.skills.length > 0}
		<section id="skills" class="profile-skills">
			<h2>Skills</h2>
			<Skills {data} />
		</section>
	{/if}
	<!-- {%- if data.member.skills|length > 0 -%}
	<section id="skills" class="profile-skills">
		<h2>Skills</h2>
		{%- include 'sections/skills.njk' -%}
	</section>
	{%- endif -%} -->
</main>

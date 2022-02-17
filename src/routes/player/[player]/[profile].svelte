<script lang="ts" context="module">
	import { cacheInventories } from '$lib/minecraft/inventory'
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player
		const profile: string = params.profile
		const data = await fetch(`${API_URL}player/${player}/${profile}?customization=true`).then(r =>
			r.json()
		)

		const pack = params.pack ?? data?.customization?.pack

		await cacheInventories(data.member.inventories, pack)

		return {
			props: {
				data,
				pack,
			},
		}
	}
</script>

<script lang="ts">
	import Username from '$lib/minecraft/Username.svelte'
	import Infobox from '$lib/sections/Infobox.svelte'
	import { generateInfobox } from '$lib/profile'
	import Header from '$lib/Header.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import { cleanId } from '$lib/utils'
	import Head from '$lib/Head.svelte'
	import Toc from '$lib/Toc.svelte'
	import Skills from '$lib/sections/Skills.svelte'
	import Armor from '$lib/sections/Armor.svelte'

	export let data
	export let pack: string

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
	description={generateInfobox(data, { meta: true }).join('\n')}
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

	<Infobox {data} />

	<Toc {categories} />

	{#if data.member.skills.length > 0}
		<section id="skills" class="profile-skills">
			<h2>Skills</h2>
			<Skills {data} />
		</section>
	{/if}

	<br />

	<div>
		<div id="categories">
			{#if data.member.inventories.armor}
				<section id="armor" class:armor-float={data.member.inventories.inventory}>
					<h2>Armor</h2>
					<Armor {data} {pack} />
				</section>
			{/if}
			<!-- {%- if data.member.inventories.armor -%}
				<section id="armor"{% if data.member.inventories.inventory %} class="armor-float"{% endif %}>
					<h2>Armor</h2>
					{%- include 'sections/armor.njk' -%}
				</section>
			{%- endif -%}
			{%- if data.member.inventories.inventory -%}
				<section id="inventories">
					<h2>Inventories</h2>
					{%- include 'sections/inventories.njk' -%}
				</section>
			{%- endif -%}
			{%- asyncAll category in categories -%}
				{%- set sectionContents -%}
				{% with { data: data, category: category } %}
					{%- include 'sections/' + category + '.njk' -%}
				{% endwith %}
				{%- endset -%}
				{%- if sectionContents|trim and sectionContents|trim != '<ul></ul>' -%}
					<section id="{{ category }}" class="collapsible">
						<h2>{{ category|replace('_', ' ')|title }}</h2>
						{{- sectionContents|safe -}}
					</section>
				{%- endif -%}
			{%- endall -%} -->
		</div>
	</div>
</main>

<style>
	.profile-skills {
		display: inline-block;
		position: absolute;
		margin: 1em;
		margin-top: 1.6em;
	}
</style>

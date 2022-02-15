<script lang="ts" context="module">
	import { get } from '$lib/api'
	import type { Load } from '@sveltejs/kit'
	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player
		// if (browser) alert('doing get')
		const res = await fetch(`https://skyblock-api.matdoes.dev/player/${player}`).then(r => r.json())
		// const res = await get(`player/${player}`)
		return {
			props: {
				data: res,
			},
		}
	}
</script>

<script lang="ts">
	import Head from '$lib/Head.svelte'
	import Header from '$lib/Header.svelte'
	import { browser } from '$app/env'
	import Username from '$lib/Username.svelte'

	export let data

	let activeProfile = null
	let activeProfileLastSave: number
</script>

<Head title="{data.player.username}'s SkyBlock profiles" />
<Header />

<svelte:head>
	{#if data.customization?.backgroundUrl}
		<style>
			body:before {
				content: '';
				display: block;
				position: fixed;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: -10;
				background: url('{data.customization.backgroundUrl}') no-repeat center center;
				background-size: cover;
			}
		</style>
	{/if}
</svelte:head>

<!-- {% endblock %}
{%- block main -%}
	<h1>{{ render.username(data.player, headType='3d') }}'s profiles</h1>
{%- set activeProfile = null -%}
{%- set activeProfileLastSave = 0 -%}
{%- for profile in data.profiles -%}
{%- for member in profile.members -%}
{%- if member.uuid == data.player.uuid and member.last_save > activeProfileLastSave -%}
{%- set activeProfile = profile -%}
{%- set activeProfileLastSave = member.last_save -%}
{%- endif -%}
{%- endfor -%}
{%- endfor -%}
{%- set activeProfileOnline = getTime() - 60 < activeProfileLastSave -%}
	<ul class="profile-list">
{%- for profile in data.profiles -%}
		<li class="profile-list-item{% if profile.uuid == activeProfile.uuid %} profile-list-item-active{% if activeProfileOnline %} profile-list-item-online{% endif %}{% endif %}">
			<a class="profile-name" href="/player/{{ data.player.username }}/{{ profile.name }}">{{ profile.name }}</a>
{#- This comment is necessary to remove the space between the profile name and the user list :) -#}
			<span class="profile-members">
{%- if profile.members|length > 1 %}{% for player in profile.members -%}
{#- don't unnecessarily hyperlink to the page it's already o -#}
{%- set hyperlinkToProfile = player.uuid != data.player.uuid -%}
{{- render.username(player, headType='2d', hyperlinkToProfile=hyperlinkToProfile) -}}
{%- endfor -%}
{%- else %}Solo{% endif -%}
			</span>
		</li>
{%- endfor -%}
	<ul>
{%- endblock -%} -->

<h1><Username player={data.player} headType="3d" />'s profiles</h1>

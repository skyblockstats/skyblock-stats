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
	let activeProfileLastSave: number = 0

	for (const profile of data.profiles) {
		for (const member of profile.members) {
			if (member.uuid === data.player.uuid && member.last_save > activeProfileLastSave) {
				activeProfile = profile
				activeProfileLastSave = member.last_save
			}
		}
	}

	// {%- set activeProfileOnline = getTime() - 60 < activeProfileLastSave -%}
	const isActiveProfileOnline = Date.now() / 1000 - 60 < activeProfileLastSave
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

<h1><Username player={data.player} headType="3d" />'s profiles</h1>

<ul class="profile-list">
	{#each data.profiles as profile}
		<li
			class="profile-list-item"
			class:profile-list-item-active={profile.uuid === activeProfile.uuid}
			class:profile-list-item-online={profile.uuid === activeProfile.uuid && isActiveProfileOnline}
		>
			<a class="profile-name" href="/player/{data.player.username}/{profile.name}">
				{profile.name}
			</a>
			<span class="profile-members">
				{#if profile.members.length > 1}
					{#each profile.members as player}
						<span class="member">
							<Username
								{player}
								headType="2d"
								hyperlinkToProfile={player.uuid != data.player.uuid}
							/>
						</span>
					{/each}
				{:else}
					Solo
				{/if}
			</span>
		</li>
	{/each}
</ul>

<style>
	.profile-name {
		margin-right: 0.5em;
	}

	.profile-members {
		color: var(--theme-main-text);
	}
	.profile-members > .member {
		margin-right: 0.35em;
	}

	.profile-list {
		font-size: 1.5em;
	}

	.profile-list-item {
		margin-bottom: 0.5em;
		color: var(--theme-darker-text);
	}
	.profile-list-item-active {
		color: #fff;
	}
	.profile-list-item-online {
		color: #0e0;
	}
</style>

<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player

		const data = await fetch(`${API_URL}player/${player}?customization=true`).then(r => r.json())

		if (!data.player) {
			return { fallthrough: true } as unknown
		}

		if (data.player.username !== player) {
			return {
				redirect: `/player/${data.player.username}`,
				status: 302,
			} as any
		}

		return {
			props: {
				data,
			},
		}
	}
</script>

<script lang="ts">
	import type { CleanProfile, CleanUser } from '$lib/APITypes'
	import Username from '$lib/minecraft/Username.svelte'
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'
	import { onDestroy } from 'svelte'

	export let data: CleanUser

	let activeProfile: CleanProfile | null = null
	let activeProfileLastSave: number = 0
	let isActiveProfileOnline: boolean

	$: {
		if (data.profiles)
			for (const profile of data.profiles) {
				if (profile.members)
					for (const member of profile.members) {
						if (member.uuid === data.player?.uuid && member.last_save > activeProfileLastSave) {
							activeProfile = profile
							activeProfileLastSave = member.last_save
						}
					}
			}

		isActiveProfileOnline = Date.now() / 1000 - 60 < activeProfileLastSave
	}

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

<Head title={data.player ? `${data.player.username}'s SkyBlock profiles` : 'Invalid player'} />
<Header />

<main>
	<h1><Username player={data.player} headType="3d" />'s profiles</h1>

	<ul class="profile-list">
		{#each data.profiles ?? [] as profile}
			<li
				class="profile-list-item"
				class:profile-list-item-active={profile.uuid === activeProfile?.uuid}
				class:profile-list-item-online={profile.uuid === activeProfile?.uuid &&
					isActiveProfileOnline}
			>
				<a
					class="profile-name"
					href="/player/{data.player?.username}/{profile.name}"
					sveltekit:prefetch
				>
					{profile.name}
				</a>
				<span class="profile-members">
					{#if (profile.members?.length ?? 0) > 1}
						{#each profile.members ?? [] as player}
							<span class="member">
								<Username
									{player}
									headType="2d"
									hyperlinkToProfile={player.uuid != data.player?.uuid}
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
</main>

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

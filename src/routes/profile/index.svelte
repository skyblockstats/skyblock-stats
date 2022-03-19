<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'
	import type { AccountCustomization, AccountSchema, CleanUser, SessionSchema } from '$lib/APITypes'
	import Head from '$lib/Head.svelte'
	import Header from '$lib/Header.svelte'
	import donators from '../../_donators.json'
	import admins from '../../_admins.json'

	export const load: Load = async ({ fetch, session }) => {
		const sessionResponse: { session: SessionSchema | null; account: AccountSchema | null } | null =
			await fetch(`${API_URL}accounts/session`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					uuid: session.sid,
				}),
			}).then(r => r.json())

		const playerResponse = sessionResponse?.account
			? await fetch(`${API_URL}player/${sessionResponse.account.minecraftUuid}`).then(r => r.json())
			: null

		// redirect to /login if the user is not logged in
		if (
			!sessionResponse ||
			!sessionResponse.account ||
			!sessionResponse.session ||
			!playerResponse.player
		) {
			return { redirect: '/login', status: 303 }
		}

		const isDonator =
			donators.find(d => d.uuid === sessionResponse.account?.minecraftUuid) !== undefined
		const isAdmin = admins.find(a => a === sessionResponse.account?.minecraftUuid) !== undefined

		return {
			props: {
				session: sessionResponse.session,
				account: sessionResponse.account,
				player: playerResponse,
				isDonator: isDonator || isAdmin,
			},
		}
	}
</script>

<script lang="ts">
	import Emoji from '$lib/Emoji.svelte'
	import { browser } from '$app/env'
	import Tooltip from '$lib/Tooltip.svelte'
	import { onDestroy, onMount } from 'svelte'
	import backgroundNames from '../../_backgrounds.json'

	export let session: SessionSchema
	export let account: AccountSchema
	export let player: CleanUser

	export let isDonator: boolean

	let pack: AccountCustomization['pack'] = account?.customization?.pack ?? 'furfsky_reborn'
	let blurBackground: AccountCustomization['blurBackground'] =
		account?.customization?.blurBackground ?? false
	let backgroundName: string | undefined = account?.customization?.backgroundUrl?.replace(
		/^\/backgrounds\//,
		''
	)
	let emoji: AccountCustomization['emoji'] = account?.customization?.emoji

	let mounted = false
	onMount(() => {
		mounted = true
	})
	onDestroy(() => {
		mounted = false
	})

	let error: string | undefined
	let loading: boolean = false

	async function updateProfile() {
		if (!browser || !mounted) return
		error = undefined
		loading = true
		const response = await fetch('/profile/update', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				pack,
				blurBackground,
				backgroundName,
				emoji,
			}),
		})
			.then(r => {
				loading = false
				return r.json()
			})
			.catch(e => {
				loading = false
				error = e.message
			})
		if (!response.ok) {
			error = response.error
		}
	}

	// call updateProfile whenever anything is changed
	$: [pack, blurBackground, backgroundName, emoji, updateProfile()]
</script>

<Head title="Customize Profile" />
<Header />

<main>
	{#if session && session._id}
		<a href="/logout?sid={session._id}" class="logout"><button>Log out</button></a>
	{/if}
	<h1>Customize Profile</h1>
	<noscript>
		<p><Emoji value="⚠" /> Please enable JavaScript to use this page.</p>
	</noscript>

	<p class="status">
		{#if error}
			<Emoji value="🚫" /> {error}
		{:else if loading}
			<Emoji value="🔄" /> Loading...
		{/if}
	</p>

	<a href="/player/{player.player?.username}">View profile</a>
	<p>
		<label for="pack-selector">Pack: </label>
		<select bind:value={pack} id="pack-selector">
			<option value="ectoplasm">Ectoplasm</option>
			<option value="furfsky">Furfsky</option>
			<option value="furfsky_reborn">Furfsky Reborn</option>
			<option value="hypixel+">Hypixel+</option>
			<option value="packshq">PacksHQ</option>
			<option value="rnbw">RNBW</option>
			<option value="vanilla">Vanilla</option>
			<option value="worlds_and_beyond">Worlds and Beyond</option>
		</select>
	</p>
	<p>
		<label for="blur-background-toggle">Blur and darken background behind content: </label>
		<input type="checkbox" id="blur-background-toggle" bind:checked={blurBackground} />
	</p>
	{#if isDonator}
		<label for="profile-emoji-selector">Emoji next to username: </label>
		<input type="text" name="emoji" id="profile-emoji-selector" bind:value={emoji} />
		<Tooltip width="15em">
			<span slot="tooltip">
				<p>Windows: <code>win+.</code></p>
				<p>Mobile: Emoji keyboard</p>
			</span>
			<span>ⓘ</span>
		</Tooltip>
	{/if}
	<h2>Background</h2>
	<div id="background-selector-list">
		{#each backgroundNames as thisBackgroundName}
			<span
				class="selectable-background-option"
				class:selected={thisBackgroundName === backgroundName}
				style="background-image: url(/backgrounds-small/{thisBackgroundName})"
				on:click={() => (backgroundName = thisBackgroundName)}
			/>
		{/each}
	</div>
</main>

<style>
	.logout {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
	}
	.status {
		position: relative;
		top: -1.6em;
		height: 0;
		margin: 0;
	}
	#profile-emoji-selector {
		width: 2em;
	}
	p {
		margin: 0.2em 0;
	}
	#background-selector-list {
		display: flex;
		flex-wrap: wrap;
	}
	.selectable-background-option {
		display: inline-block;
		height: 10em;
		width: 18em;
		background-position: center;
		background-size: 110%;
		margin: 0.5em;
		border-radius: 1em;
		transition: background-size 500ms;
		cursor: pointer;
	}
	.selectable-background-option:hover {
		background-size: 125%;
	}
	.selectable-background-option.selected {
		box-shadow: 0 0 0 2pt #06ec;
	}
</style>

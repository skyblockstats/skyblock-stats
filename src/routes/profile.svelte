<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'
	import type { AccountSchema, CleanMemberProfile, CleanUser, SessionSchema } from '$lib/APITypes'
	import Head from '$lib/Head.svelte'
	import Header from '$lib/Header.svelte'

	export const load: Load = async ({ params, fetch, session }) => {
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
			? await fetch(
					`${API_URL}player/${sessionResponse.account.minecraftUuid}?customization=true`
			  ).then(r => r.json())
			: null

		// redirect to /login if the user is not logged in
		if (!sessionResponse?.account) {
			return { redirect: '/login', status: 303 }
		}

		return {
			props: {
				session: sessionResponse.session,
				account: sessionResponse.account,
				player: playerResponse,
			},
		}
	}
</script>

<script lang="ts">
	import Emoji from '$lib/Emoji.svelte'

	export let session: SessionSchema | null
	export let account: AccountSchema | null
	export let player: CleanUser | null
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
	{#if player && player.player}
		<a href="/player/{player.player.username}">View profile</a>
	{:else}
		<p><Emoji value="⚠" /> No linked Minecraft account</p>
	{/if}
	<p>
		Pack: <select>
			<option value="default">Default</option>
			<option value="custom">Custom</option>
		</select>
	</p>
</main>

<style>
	.logout {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
	}
</style>

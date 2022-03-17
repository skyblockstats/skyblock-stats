<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	export const load: Load = async ({ params, fetch, session, url }) => {
		if (session.sid === undefined) {
			return { redirect: '/login', status: 303 }
		}
		return {
			props: {
				errorCode: url.searchParams.get('error'),
				current: url.searchParams.get('current'),
				correct: url.searchParams.get('correct'),
			},
		}
	}
</script>

<script lang="ts">
	import Emoji from '$lib/Emoji.svelte'
	import Head from '$lib/Head.svelte'
	import Header from '$lib/Header.svelte'

	export let errorCode: string | null
	export let current: string | null
	export let correct: string | null

	const errorCodes = {
		NO_IGN: 'Please enter a valid Minecraft username.',
		NOT_LINKED:
			'Please link your Discord in Hypixel by doing /profile -> Social media -> Discord. If you just changed it, wait a few minutes and try again.',
		WRONG_NAME: `You're linked to ${current} on Hypixel. Please change this to ${correct} by doing /profile -> Social media -> Discord. If you just changed it, wait a few minutes and try again.`,
		NO_KEY:
			"This instance of skyblock-stats doesn't have a skyblock-api key set. Please contact the owner of the website if you believe this to be a mistake.",
	}
</script>

<Head title="Verify Account" />
<Header />

<main>
	<h1>Verify Minecraft account</h1>
	<p>Please enter your Minecraft username to verify that this is your account.</p>
	<p>This will check with the Hypixel API that your Discord username matches your Hypixel name.</p>
	{#if errorCode && errorCode in errorCodes}
		<div class="error">
			<Emoji value="🚫" />
			{errorCodes[errorCode]}
		</div>
	{/if}
	<form method="post" action="/verify">
		<input placeholder="Username or UUID" name="ign" required />
		<input type="submit" value="Enter" />
	</form>
</main>

<style>
	p {
		margin: 0;
	}
	.error {
		font-weight: bold;
		margin: 1em 0;
	}
</style>

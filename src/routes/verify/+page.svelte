<script lang="ts">
	import Emoji from '$lib/Emoji.svelte'
	import Head from '$lib/Head.svelte'
	import Header from '$lib/Header.svelte'
	import type { PageData } from './$types'

	export let data: PageData

	export let errorCode: string | null = data.errorCode
	export let current: string | null = data.current
	export let correct: string | null = data.correct

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
	<p>
		This will check with the Hypixel API that your Discord username matches the Discord name set in
		your Hypixel settings.
	</p>
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

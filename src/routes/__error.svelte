<script lang="ts" context="module">
	import type { ErrorLoad } from '@sveltejs/kit'

	export const load: ErrorLoad = async ({ error, status }) => {
		return {
			props: {
				error,
				status,
			},
		}
	}
</script>

<script lang="ts">
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'

	export let status: number
	export let error: Error
</script>

<Head title={error.message} />
<Header />

<main>
	<div>
		<h1>{status}</h1>
		<p>{error.message}</p>
		<a href="/" sveltekit:prefetch>Home</a>
	</div>
</main>

<style>
	main {
		height: calc(100% - 4rem);
		/* vertical align */
		display: grid;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-size: 3em;
		margin: 0;
	}
	p {
		margin: 0;
	}
	a {
		display: block;
		margin-top: 0.5rem;
	}
</style>

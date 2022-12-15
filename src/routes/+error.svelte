<script lang="ts">
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'

	import { page } from '$app/stores'

	// sveltekit bug: types of error and status say they can be null but they can't
	let error = $page.error!
	let status = $page.status!
</script>

<Head title={error.message} />
<Header />

<main>
	<div>
		<h1>{status}</h1>
		<p>{error.message}</p>
		<a href="/" data-sveltekit-preload-data="hover">Home</a>
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

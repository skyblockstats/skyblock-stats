<script lang="ts">
	import { goto } from '$app/navigation'
	import SearchUser from './SearchUser.svelte'

	export let backArrowHref = '/'
	let searchUserValue = ''
</script>

<header id="main-header">
	<a href={backArrowHref} class="back-arrow-anchor" aria-label="back" sveltekit:prefetch>
		<svg class="back-arrow" height="33" width="23">
			<path d="M 14 0 l -13 13 l 13 13" stroke-width="2" fill="none" />
		</svg>
	</a>
	<span class="username-input-container">
		<SearchUser bind:value={searchUserValue} />
	</span>
</header>

<style>
	header {
		background-color: var(--theme-background);
		box-shadow: 0 0 1em rgba(0, 0, 0, 0.8);
		padding: 0.5rem 10%;
	}

	.username-input-container {
		display: inline-block;
		text-align: center;
		font-size: 1.25rem;
		/* center the forms */
		margin: 0 auto;
		width: max-content;

		box-shadow: none;
		/* add a slight shadow on the form in the index page */
		max-width: calc(90vw - 8em);
	}

	.back-arrow {
		float: left;
		transition: stroke 200ms;
		stroke: var(--theme-darker-text);
		margin-top: 0.4em;
		margin-right: 1em;
	}
	.back-arrow:hover {
		stroke: var(--theme-main-text);
	}
</style>

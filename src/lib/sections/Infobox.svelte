<script lang="ts">
	import { generateInfobox } from '$lib/profile'
	import Username from '$lib/minecraft/Username.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import { onMount } from 'svelte'

	export let data

	// onMount(() => {
	// 	// reload the data every second so the infobox updates
	// 	const interval = setInterval(() => {
	// 		data = data
	// 	}, 1000)

	// 	return () => clearInterval(interval)
	// })
</script>

<div id="infobox">
	<h2><Username player={data.member} prefix /> ({data.member.profileName})</h2>
	{#each generateInfobox(data) as item}
		<p><Emoji value={item} /></p>
	{/each}
</div>

<style>
	#infobox {
		float: right;
		max-width: 95%;
		background-color: rgba(20, 20, 20, 0.4);
		padding: 1em;
		margin-top: 2em;
		width: 20em;
		border-radius: 0.5em;
		box-shadow: 0 0 1em #000;
	}
	p {
		margin: 0 0 0.25em 0;
	}
	@media only screen and (max-width: 600px) {
		#infobox {
			position: relative;
			right: -2em;
			margin-top: 0;
		}
	}
	@media only screen and (max-width: 550px) {
		#infobox {
			position: unset;
			box-shadow: none;
			float: none;
			border: 1px solid var(--theme-lighter-background);
		}
	}
</style>

<script lang="ts">
	import { generateInfobox } from '$lib/profile'
	import Username from '$lib/minecraft/Username.svelte'
	import Emoji from '$lib/Emoji.svelte'

	export let data
</script>

<div id="infobox-container">
	<div id="infobox">
		<h2>
			<Username player={data.member} prefix /> ({data.member.left
				? 'Removed'
				: data.member.profileName})
		</h2>
		{#each generateInfobox(data) as item}
			<!-- hack so fairy souls is clickable to get to the leaderboards -->
			{#if item.includes('Fairy souls')}
				<a href="/leaderboards/fairy_souls" class="fairy-souls-leaderboard"
					><p><Emoji value={item} /></p></a
				>
			{:else}
				<p><Emoji value={item} /></p>
			{/if}
		{/each}
	</div>
	<div id="infobox-extra">
		<p>Player UUID:</p>
		<b><code>{data.member.uuid}</code></b>
		<p>Profile UUID:</p>
		<b><code>{data.profile.uuid}</code></b>
	</div>
</div>

<style>
	#infobox-container {
		float: right;
		max-width: 95%;
		width: 20em;
	}
	#infobox {
		background-color: rgba(20, 20, 20, 0.4);
		padding: 1em;
		margin-top: 2em;
		border-radius: 0.5em;
		box-shadow: 0 0 1em #000;
	}
	#infobox-extra {
		opacity: 0.5;
		margin-top: 0.5rem;
	}
	#infobox-extra p {
		margin: 0;
	}
	p {
		margin: 0 0 0.25em 0;
	}
	.fairy-souls-leaderboard {
		color: inherit;
		text-decoration: none;
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
	@media only screen and (max-width: 460px) {
		#infobox-container {
			max-width: 100%;
			float: left;
		}
	}
</style>

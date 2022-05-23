<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = async ({ params, fetch, session }) => {
		return {
			props: {
				loggedIn: session.sid !== undefined,
			},
		}
	}
</script>

<script lang="ts">
	import Username from '$lib/minecraft/Username.svelte'
	import SearchUser from '$lib/SearchUser.svelte'
	import donators from '../_donators.json'
	import Head from '$lib/Head.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import LoginButton from '$lib/LoginButton.svelte'

	export const hydrate = false

	export let loggedIn: boolean
</script>

<svelte:head>
	<title>SkyBlock Stats</title>
</svelte:head>

<Head
	title="SkyBlock Stats"
	description="Check SkyBlock stats, see leaderboards, mayors, and way more."
/>
<a class="github" href="https://github.com/skyblockstats/skyblock-stats">
	<img src="/github-mark-light.png" alt="View source on GitHub" />
</a>

<main>
	<LoginButton {loggedIn} />
	<section class="title-section">
		<h1>SkyBlock Stats</h1>
		<SearchUser>
			<button>View Profiles</button>
		</SearchUser>
	</section>

	<hr style="margin: 25vh 0 2em 0" />

	<section>
		<h2>Other SkyBlock tools</h2>
		<ul id="other-tools-list">
			<li><a href="/auctionprices">Auction prices</a></li>
			<li><a href="/leaderboards">Leaderboards</a></li>
			<li><a>Bazaar (coming soon)</a></li>
			<li><a href="/chat">Fake chat generator</a></li>
			<li><a href="https://skyblock-npcs.matdoes.dev">NPC Skin Stealer</a></li>
			<li><a href="/election">Mayor Election Status</a></li>
			<li><a href="/items">Item List</a></li>
		</ul>
	</section>

	<section id="donators">
		<h2>Donators</h2>
		<p>
			Thank you to these people for
			<a href="https://ko-fi.com/matdoesdev" target="_blank">donating</a>. <Emoji value="❤" />
		</p>
		<ul>
			{#each donators as donator}
				<li><Username player={donator} headType="2d" hyperlinkToProfile /></li>
			{/each}
		</ul>
	</section>
	<section>
		<h2>Info</h2>
		<p>Website made by <a href="https://matdoes.dev">mat</a>.</p>
		<p>
			Official hangout/support Discord:
			<a href="//discord.gg/KtscNUnh4f">discord.gg/KtscNUnh4f</a>.
		</p>
		<p>
			Resource packs: <a href="//packshq.com">PacksHQ</a> (default),
			<a href="//hypixel.net/threads/2138599">Furfsky</a>,
			<a href="//furfsky.net">Furfsky Reborn</a>,
			<a href="//hypixel.net/threads/2239953">Ectoplasm</a>,
			<a href="//hypixel.net/threads/3470904">RNBW</a>,
			<a href="//hypixel.net/threads/4174260">Hypixel+</a>,
			<a href="//hypixel.net/threads/3597207">Worlds and Beyond</a>.
		</p>
		<p>
			Minecraft skin APIs: <a href="//h.matdoes.dev">
				mat's super duper simple minecraft head renderer
			</a>
			for heads and
			<a href="//mc-heads.net">mc-heads.net</a> for full-body renders.
		</p>
		<p>Emojis: <a href="//twemoji.twitter.com/">Twemoji</a>.</p>
		<p>Font: <a href="//brailleinstitute.org/freefont">Atkinson Hyperlegible</a>.</p>
		<p class="secret">Thank you to Duckie Cousin Gaming for the idea to add harp leaderboards.</p>
	</section>
</main>

<style>
	h1 {
		text-align: center;
	}

	.title-section {
		margin: 0 auto;
		width: fit-content;
	}

	#donators p {
		margin: 0;
	}

	li {
		padding: 0.2em 0;
	}

	.github {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		opacity: 0.2;
		transition: opacity 200ms;
	}
	.github:hover {
		opacity: 0.9;
	}
	.github > img {
		width: 2rem;
	}

	.secret {
		color: var(--theme-main-background);
		margin: 0;
		font-size: 6pt;
		margin-top: -0.5rem;
	}
</style>

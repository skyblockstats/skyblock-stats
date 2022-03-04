<script lang="ts">
	import Username from '$lib/minecraft/Username.svelte'
	import SearchUser from '$lib/SearchUser.svelte'
	import type { CleanUser } from '$lib/APITypes'
	import donators from '../_donators.json'
	import Head from '$lib/Head.svelte'
	import Emoji from '$lib/Emoji.svelte'

	export const prerender = true
	export const hydrate = false
</script>

<svelte:head>
	<title>SkyBlock Stats</title>
</svelte:head>

<Head
	title="SkyBlock Stats"
	description="Check SkyBlock stats, see leaderboards, mayors, and way more."
/>

<main>
	<section class="title-section">
		<h1>SkyBlock Stats</h1>
		<SearchUser>
			<button>View Profiles</button>
		</SearchUser>
	</section>

	<hr style="margin: 25vh 0 2em 0" />

	<section>
		<h3>Other SkyBlock tools</h3>
		<ul>
			<li><a>Auction prices (coming soon)</a></li>
			<li><a href="/leaderboards">Leaderboards</a></li>
			<li><a>Bazaar (coming soon)</a></li>
			<li><a href="/chat">Fake chat generator</a></li>
			<li><a href="https://skyblock-npcs.matdoes.dev">NPC Skin Stealer</a></li>
			<li><a href="/election">Mayor Election Status</a></li>
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
		<p>Join the <a href="https://discord.gg/nWQKpzPCPJ">Forum Sweats</a> Discord server.</p>
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
			Minecraft skin APIs: <a href="//mc-heads.net">mc-heads.net</a> for 3d renders and
			<a href="//mc-crafatar.com">crafatar.com</a> for 2d heads.
		</p>
		<p>Emojis: <a href="//twemoji.twitter.com/">Twemoji</a>.</p>
		<p>Font: <a href="//brailleinstitute.org/freefont">Atkinson Hyperlegible</a>.</p>
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
</style>

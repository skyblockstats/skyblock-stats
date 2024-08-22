<script lang="ts">
	import '../app.css'
	import GlobalTooltip from '$lib/layout/GlobalTooltip.svelte'
	import Loader from '$lib/layout/Loader.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import { browser } from '$app/environment'

	let sunsetBannerHidden = true
	if (browser) {
		if (localStorage.getItem('sunsetBannerHidden') !== '1') {
			sunsetBannerHidden = false
		}
	}
	function hideSunsetBanner() {
		sunsetBannerHidden = true
		localStorage.setItem('sunsetBannerHidden', '1')
	}
</script>

<Loader />
<GlobalTooltip />
<nav />
<div id="sunset-banner" class:sunset-banner-hidden={sunsetBannerHidden}>
	<b>
		<Emoji value="⚠" /> Sunsetting notice
		<button id="sunset-banner-close-btn" on:click={hideSunsetBanner}>×</button>
	</b>
	<p>
		skyblock.matdoes.dev is shutting down on <a
			href="https://hypixel.net/threads/public-api-endpoint-changes.5537323/">September 20th</a
		> because Hypixel is removing the old version of the SkyBlock API and I simply do not have the motivation
		to maintain the website anymore. I haven't done any significant updates in years and I don't even
		like SkyBlock now. Also, it's been partially broken for a while due to API ratelimits becoming more
		strict.
	</p>
	<p>
		Reminder that the entire website is open source on <a href="https://github.com/skyblockstats"
			>GitHub</a
		> in case you'd like to do anything with it. It's not particularly good code though, please don't
		ask me for help with it. The leaderboards database is available in the announcements channel of the
		Discord server,
	</p>
	<p>
		It's been fun, my highlight was probably when Technoblade showed a screenshot of my website for
		about a second in the second Potato War video. :)
	</p>
	<p>cya.</p>
	<span>- mat</span>
</div>
<slot />

<noscript>
	<style>
		#sunset-banner-close-btn {
			display: none;
		}
	</style>
</noscript>

<style>
	#sunset-banner {
		max-width: 900px;
		margin: 0 auto;
		border: 1px solid var(--theme-darker-text);
		padding: 0.5em;
	}
	#sunset-banner-close-btn {
		float: right;
	}
	.sunset-banner-hidden {
		display: none;
	}
</style>

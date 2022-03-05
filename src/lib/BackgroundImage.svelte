<script lang="ts">
	import { browser } from '$app/env'

	import { onDestroy } from 'svelte'

	export let url: string

	// cursed svelte :D
	$: bodyStyle =
		'<sty' + 'le id="background-image-style">:root{--background:url(' + url + ')}</st' + 'yle>'

	// get rid of the body style when we leave the page
	// not doing this will sometimes cause the background to stay
	onDestroy(() => {
		bodyStyle = ''
		// hack since sometimes the style is not removed
		if (browser) {
			let styleEl = document.getElementById('background-image-style')
			if (styleEl) styleEl.remove()
		}
	})
</script>

<svelte:head>
	{@html bodyStyle}
</svelte:head>

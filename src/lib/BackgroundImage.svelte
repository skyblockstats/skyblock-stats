<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { browser } from '$app/env'

	export let url: string
	let styleHtml = `<style class="background-image-style">:root{--background:url(${url})}</style>`
	let serverSideRenderedStyleShown = true

	function updateUrl() {
		if (!browser) return

		for (const styleEl of document.getElementsByClassName('background-image-style'))
			styleEl.innerHTML = ''

		// add bodyStyle to the head
		const style = document.createElement('style')
		style.classList.add('background-image-style')
		style.innerHTML = `:root{--background:url(${url})}`
		document.head.appendChild(style)
	}

	$: [url, updateUrl()]

	onMount(() => {
		serverSideRenderedStyleShown = false
	})

	// get rid of the body style when we leave the page
	// not doing this will sometimes cause the background to stay
	onDestroy(() => {
		if (browser) {
			for (const styleEl of document.getElementsByClassName('background-image-style'))
				styleEl.innerHTML = ''
		}
	})
</script>

<svelte:head>
	{#if serverSideRenderedStyleShown}
		{@html styleHtml}
	{/if}
</svelte:head>

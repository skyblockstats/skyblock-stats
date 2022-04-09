<!-- 
	@component
	
	Collapsible content that works without JS but is enhanced by it.
 -->
<script lang="ts">
	import { browser } from '$app/env'
	import { onMount } from 'svelte'
	import { cleanId } from './utils'

	let open: boolean
	export let id: string | undefined = undefined
	$: elementId = id?.replace(/_/, '-')
	export let lazy = true

	let detailsEl

	function checkHash() {
		if (elementId && elementId === location.hash.slice(1)) {
			console.log('open')
			open = true
			requestAnimationFrame(() => {
				// scroll to the element
				window.scrollTo({
					top: detailsEl.offsetTop,
					behavior: 'smooth',
				})
			})
		}
	}

	onMount(() => {
		if (browser) checkHash()
	})
	if (browser) checkHash()
</script>

<svelte:window on:hashchange={checkHash} />

<details bind:open id={elementId} bind:this={detailsEl}>
	<summary>
		<slot name="title">
			<h2>{id ? cleanId(id) : 'Details'}</h2>
		</slot>
	</summary>
	<div>
		{#if lazy}
			<!--
			We do this so images and other things inside the content are not
			loaded until it's open.
			For some reason browsers don't handle this, although they should.
		-->
			<noscript>
				<slot />
			</noscript>
			{#if open}
				<slot />
			{/if}
		{:else}
			<slot />
		{/if}
	</div>
</details>

<style>
	details {
		margin-bottom: 0.5em;
	}
	summary > :global(*) {
		display: inline;
	}

	summary {
		cursor: pointer;
		list-style: none;
	}
	summary::marker,
	summary::-webkit-details-marker {
		content: '';
		display: none;
	}

	summary:focus {
		outline: none;
		box-shadow: 0 0 0 2pt #06e7;
		border-radius: 0.1em;
		width: fit-content;
		padding-right: 0.2em;
	}

	summary::before {
		/* the background image is an arrow pointing down */
		background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBkPSJNMTcuNSA0Ljc1bC03LjUgNy41LTcuNS03LjVMMSA2LjI1bDkgOSA5LTl6IiBmaWxsPSIjYWFhIi8+IDwvc3ZnPg==);
		width: 20px;
		height: 20px;
		display: inline-block;
		margin-right: 1em;
		content: '';
	}
	details[open] summary::before {
		transform: rotate(180deg);
	}
</style>

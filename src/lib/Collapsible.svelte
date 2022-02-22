<!-- 
	@component
	
	Non-JS collapsible content.
 -->
<script lang="ts">
	let open: boolean
</script>

<details bind:open>
	<summary>
		<slot name="title">
			<h2>Details</h2>
		</slot>
	</summary>
	<div>
		<!--
			We do this so images inside the content are not loaded until it's
			open. The browser (only tested on FF) doesn't handle this, although
			it probably should.
		-->
		<noscript>
			<slot />
		</noscript>
		{#if open}
			<slot />
		{/if}
	</div>
</details>

<style>
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

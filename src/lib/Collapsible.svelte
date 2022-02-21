<!-- 
	@component
	
	Non-JS collapsible content.
 -->

<details>
	<summary>
		<slot name="title">
			<h2>Details</h2>
		</slot>
	</summary>
	<div>
		<slot />
	</div>
</details>

<style>
	summary > :global(*) {
		display: inline;
	}
	summary {
		cursor: pointer;
	}
	summary::marker {
		content: '';
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

<!-- 
    @component

    A tooltip that works without requiring JavaScript to be enabled.
    When you hover or click on the element, it shows the content in a box above the element.
 -->
<script lang="ts">
	export let width = '10em'
</script>

<span class="tooltip-container" tabindex="-1">
	<span class="tooltip-content" style="max-width: {width}">
		<slot name="tooltip">No tooltip!</slot>
	</span>
	<span class="tooltip-inner">
		<slot />
	</span>
</span>

<style>
	.tooltip-container {
		position: relative;
		cursor: pointer;
		touch-action: manipulation;
		/*
		 * We remove the outline here because in safari the tooltip looks weird
		 * and glitchy. The outline is readded later on so it's only for the content.
		 */
		outline: none !important;
	}
	.tooltip-container > .tooltip-content {
		font-size: 1rem;
		display: inline-block;
		left: 50%;
		opacity: 0;
		position: absolute;

		background: rgba(20, 20, 20, 0.9);
		border-radius: 0.25em;

		backdrop-filter: blur(0.2em);

		bottom: 125%;
		color: var(--theme-main-text);
		margin-left: max(calc(-50% - 1em), -5em);
		padding: 0.5em;

		/* this doesn't work in safari */
		transition-delay: none;
		transition: all 200ms;

		transform: scale(0.6) translateY(50%);

		width: max-content;
		text-align: center;
		cursor: auto;
		box-shadow: 0 0 1em 0.5em #0002;
		pointer-events: none;
	}
	.tooltip-container:hover > .tooltip-content,
	.tooltip-container:focus > .tooltip-content {
		opacity: 1;
		transform: scale(1) translateY(0);
	}

	/* Here's where the outline is re-added */
	.tooltip-container:focus > .tooltip-inner {
		border-radius: 0.1em;
		box-shadow: 0 0 0 2pt #06e7;
	}
	/*
	 * hide all the tooltips after if one is selected, unfortunately we can't
	 * select all the elements before and outside :(
	 */
	:global(.tooltip-container:focus ~ .tooltip-container + .tooltip-content) {
		transform: scale(0.6) translateY(50%);
		opacity: 0;
	}
</style>

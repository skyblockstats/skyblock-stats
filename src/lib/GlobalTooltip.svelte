<script lang="ts">
	import { onMount } from 'svelte'
	import { onMouseMove, registerItem, setTooltipEl } from './GlobalTooltip'

	let tooltipEl: HTMLDivElement
	$: setTooltipEl(tooltipEl)

	// // this script handles the item hover lore tooltip
	// onMount(() => {
	// 	// TODO: have something that automatically registers the event listener when we create a new MinecraftTooltip
	// 	const itemEls = document.getElementsByClassName('minecraft-tooltip')

	// 	for (const itemEl of itemEls as unknown as HTMLElement[]) registerItem(itemEl)
	// })
</script>

<svelte:window on:mousemove={onMouseMove} />
<div id="global-tooltip" style="display: none" bind:this={tooltipEl} />

<style>
	#global-tooltip {
		position: absolute;
		user-select: none;
		pointer-events: none;
		overflow: hidden;
		z-index: 100;
		background-color: #0a0a0aee;
		padding: 0 0.25rem;
		border-radius: 3px;
		box-shadow: 0 0 0 3px #206, 0 0 0 6px #000;
		font-family: Minecraft;
		white-space: nowrap;
	}
	#global-tooltip :global(p) {
		margin: 0;
	}
	#global-tooltip :global(.item-lore-name) {
		margin-bottom: 0.5em;
	}
</style>

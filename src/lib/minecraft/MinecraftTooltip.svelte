<!-- 
    @component

    A tooltip that looks like when you hover over a Minecraft item in an inventory. This requires JavaScript.
 -->
<script lang="ts">
	import { registerItem } from '$lib/GlobalTooltip'
	import { onMount } from 'svelte'

	let el

	onMount(() => {
		registerItem(el)
	})
</script>

<span class="minecraft-tooltip" bind:this={el}>
	<span class="tooltip-name">
		<slot name="name" />
	</span><span class="tooltip-lore">
		<slot name="lore" />
	</span><slot />
</span>

<style>
	.minecraft-tooltip {
		/* this makes it be less dumb about the height so it doesn't add extra or anything */
		display: grid;
		/* this is so it doesn't change width to fill the container in the item list page */
		max-width: fit-content;
	}
	/* these elements exist so we can copy them later from GlobalTooltip */
	.tooltip-name,
	.tooltip-lore {
		display: none;
	}
</style>

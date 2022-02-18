<!-- 
    @component

    A tooltip that looks like when you hover over a Minecraft item in an inventory. This requires JavaScript.
 -->

<span class="minecraft-tooltip">
	<span class="tooltip-name">
		<slot name="name" />
	</span>
	<span class="tooltip-lore">
		<slot name="lore" />
	</span>
	<slot />
</span>

<style>
	.minecraft-tooltip {
		height: fit-content;
	}
	/* these elements exist so we can copy them later from GlobalTooltip */
	.tooltip-name,
	.tooltip-lore {
		display: none;
	}
</style>

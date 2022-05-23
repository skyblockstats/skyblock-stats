<script lang="ts">
	export let player
	export let isPartOfUsername = false
</script>

<img
	loading="lazy"
	class="head head2d"
	class:player-head={isPartOfUsername}
	src="https://h.matdoes.dev/2d/{player.uuid}"
	alt="{player.username}'s face"
/>

<style>
	.head {
		user-select: none;
	}

	.head2d {
		/* pixelated rendering on 2d heads */
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		/* make the head centered correctly */
		position: relative;
		top: 0.1em;
		/* same size as font */
		height: 1em;
		width: 1em;
	}

	.player-head {
		margin-right: 0.2em;
	}
</style>

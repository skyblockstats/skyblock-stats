<script lang="ts">
	export let player
	export let isPartOfUsername = false
</script>

<img
	loading="lazy"
	class="head head3d"
	class:player-head={isPartOfUsername}
	src="https://h.matdoes.dev/3d/{player.uuid}"
	alt="{player.username}'s head"
/>

<style>
	.head {
		user-select: none;
	}

	.head3d {
		display: inline-block;
		/* make the head centered correctly */
		position: relative;
		top: 0.2em;
		/* same size as font */
		height: 1em;
		width: 1em;
	}

	.player-head {
		margin-right: 0.2em;
	}
</style>

<script lang="ts">
	export let url: string
</script>

<li class="list-item-with-icon" style="background: url({url}) 0 0/1em no-repeat">
	<slot />
</li>

<style>
	.list-item-with-icon {
		list-style: none;
		padding-left: 1.2em;
		position: relative;
		right: 1.2em;
		image-rendering: crisp-edges;
		image-rendering: pixelated;
	}
</style>

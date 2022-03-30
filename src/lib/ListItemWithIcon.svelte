<script lang="ts">
	export let src: string
	export let alt: string | undefined = undefined
</script>

<li class="list-item-with-icon">
	<img class="list-item-icon" {src} {alt} loading="lazy" />
	<slot />
</li>

<style>
	.list-item-with-icon {
		list-style: none;
		padding-left: 1.2em;
		position: relative;
		right: 1.2em;
	}
	.list-item-icon {
		image-rendering: crisp-edges;
		image-rendering: pixelated;
		height: 1em;
		position: absolute;
		margin-left: -1.2em;
	}
</style>

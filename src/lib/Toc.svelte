<script lang="ts">
	import { cleanId } from './utils'

	export let categories: string[]
</script>

<ul id="toc">
	<h3>Contents</h3>
	{#each categories as category}
		<li><a href="#{category}">{cleanId(category)}</a></li>
	{/each}
</ul>

<style>
	#toc {
		border: 1px solid rgba(255, 255, 255, 0.1);
		max-width: max-content;
		padding: 0.75em;
		border-radius: 1em;

		display: inline-block;
		background: rgba(0, 0, 0, 0.1);
	}
	#toc li {
		list-style-type: none;
	}
</style>

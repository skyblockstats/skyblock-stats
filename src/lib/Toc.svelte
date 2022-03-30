<script lang="ts">
	import { cleanId, toTitleCase } from './utils'

	export let categories: string[]
</script>

<div id="toc">
	<h3>Contents</h3>
	<ul>
		{#each categories as category}
			<li><a href="#{category.replace(/[ _]/, '-')}">{toTitleCase(cleanId(category))}</a></li>
		{/each}
	</ul>
</div>

<style>
	#toc {
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.1);
		padding: 0.75em;
		border-radius: 1em;

		max-width: max-content;
		display: inline-block;
		margin-bottom: 1em;
	}
	#toc ul {
		padding: 0;
		margin: 0;
	}
	#toc li {
		list-style-type: none;
	}
</style>

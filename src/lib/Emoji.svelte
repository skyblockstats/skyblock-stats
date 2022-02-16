<!-- 
	@component
	
	All the emojis inside this component will be turned into Twemojis.
-->
<script lang="ts">
	import { twemojiHtml } from './utils'

	export let value: string
</script>

<span>
	{@html twemojiHtml(value)}
</span>

<style>
	:global(.emoji) {
		position: relative;
		/* we specify the width so it doesn't change size when the image shows up */
		width: 1em;
		height: 1em;
		vertical-align: text-bottom;
		bottom: 0.1em;
	}
</style>

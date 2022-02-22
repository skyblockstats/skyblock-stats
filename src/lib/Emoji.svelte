<script lang="ts">
	// All the emojis inside the value will be turned into Twemojis.

	// Note: We can't make an @component comment because SvelteKit is dumb and
	// will replace the comment with whitespace

	import { twemojiHtml } from './utils'

	export let value: string
</script>

<span>{@html twemojiHtml(value)}</span>

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

<!-- 
	@component
	
	All the emojis inside the value will be turned into Twemojis.
-->
<script lang="ts">
	// Interestingly, the comment above adds whitespace so we don't need to add
	// padding before the emoji like we usually would.
	// This is very likely a SvelteKit bug, so when it's fixed we should add
	// `margin-left: .25em` to .profile-emoji

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

<script lang="ts">
	import { browser } from '$app/environment'
	import { navigating } from '$app/stores'

	let progress = 0

	let widthTransitionDuration = 1000

	let opacity = 1
	function navigationStart() {
		widthTransitionDuration = 0
		opacity = 1
		progress = 0
		requestAnimationFrame(() => {
			widthTransitionDuration = 1000
			progress = 1
		})
	}
	function navigationEnd() {
		opacity = 0
		setTimeout(() => {
			widthTransitionDuration = 0
			progress = 0
		}, 300)
	}

	let currentUrl: string | undefined = ''
	navigating.subscribe(() => {
		if (browser && $navigating?.to?.toString() !== currentUrl) {
			if ($navigating) navigationStart()
			else navigationEnd()
			currentUrl = $navigating?.to?.toString()
		}
	})
</script>

<div
	id="loader"
	style="width:{progress *
		100}%;transition-duration:{widthTransitionDuration}ms,300ms;opacity:{opacity * 100}%"
/>

<style>
	#loader {
		position: fixed;
		left: 0px;
		top: 0px;
		transition: width 1s cubic-bezier(0.4, 0, 0.2, 1), opacity 100ms linear;
		height: 6px;
		z-index: 20;
		/* add a faint glow effect */
		/* background: -moz-linear-gradient(top, #16e 0%, #16e 50%, #16e5 50%, #16e0 100%); */
		background: linear-gradient(to bottom, #16e 0%, #16e 50%, #16e5 50%, #16e0 100%);
	}
</style>

<script lang="ts">
	export let blurred = false
	export let backgroundUrl: string | null = null
</script>

<main class:has-blurred-background={blurred && backgroundUrl}>
	{#if blurred && backgroundUrl}
		<div class="blurred-background-container-container">
			<div class="blurred-background-container">
				<img class="blurred-background" src={backgroundUrl} alt="Background" />
			</div>
		</div>
	{/if}

	<div class="content">
		<slot />
	</div>
</main>

<style>
	main {
		position: relative;
		height: 100%;
	}
	.content {
		position: absolute;
		top: 0;
		bottom: 0;
	}

	.blurred-background-container-container {
		position: absolute;
		width: 47rem;
		height: calc(100% + 1em);
		z-index: -9;
		overflow: hidden;
		clip: rect(-1em, auto, auto, -2em);
	}
	.blurred-background {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -10;
		object-fit: cover;
		background-blend-mode: overlay;
		filter: blur(1em) brightness(0.6);
	}

	.content > :global(#categories),
	.content > :global(.profile-list) {
		max-width: 47rem;
	}

	@media only screen and (max-width: 1400px) {
		.blurred-background-container-container {
			left: calc(5em + 5%);
			width: 90%;
			clip: rect(-1.7em, auto, auto, -10em);
		}
		main {
			margin-top: 0.75em;
		}
	}

	@media only screen and (max-width: 1040px) {
		.blurred-background-container-container {
			left: 0 !important;
			width: 100vw !important;
		}
	}
</style>

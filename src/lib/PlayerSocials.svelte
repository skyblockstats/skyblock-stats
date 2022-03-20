<script lang="ts">
	import type { CleanSocialMedia } from './APITypes'
	import Tooltip from './Tooltip.svelte'

	export let socials: CleanSocialMedia
</script>

<span class="player-socials">
	{#if socials.discord}
		<Tooltip>
			<span slot="tooltip">{socials.discord}</span>
			<img src="/discord-mark-light.svg" alt="Discord" />
		</Tooltip>
	{/if}
	{#if socials.forums}
		<a href={socials.forums}>
			<img src="/hypixel-mark-light.png" alt="Discord" />
		</a>
	{/if}
</span>

<style>
	.player-socials img {
		height: 1em;
		vertical-align: middle;
		opacity: 0.5;
		transition: opacity 200ms;
	}

	.player-socials img:hover {
		opacity: 1;
	}

	.player-socials {
		width: fit-content;
		font-size: 1.2rem;
		vertical-align: middle;
	}
</style>

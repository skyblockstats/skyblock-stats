<script lang="ts">
	import type { CleanPlayer, CleanBasicMember, LeaderboardBasicPlayer } from '$lib/APITypes'

	import ConditionalLink from '$lib/ConditionalLink.svelte'
	import Head2d from '$lib/minecraft/heads/Head2d.svelte'
	import Head3d from '$lib/minecraft/heads/Head3d.svelte'
	import { formattingCodeToHtml } from '../utils'

	export let player: CleanPlayer | CleanBasicMember | LeaderboardBasicPlayer
	export let headType: null | '3d' | '2d' = null
	export let hyperlinkToProfile: boolean | string = false
	export let prefix = false

	/** whether the username should be crossed out and the avatar grayscaled */
	export let disabled = false
</script>

<ConditionalLink
	href="/player/{typeof hyperlinkToProfile === 'string'
		? `${player.username}/${hyperlinkToProfile}`
		: player.username}"
	isWrapped={!!hyperlinkToProfile}
>
	{#if headType == '3d'}
		<span class="head" class:grayscale={disabled}><Head3d {player} isPartOfUsername={true} /></span
		>{:else if headType == '2d'}
		<span class="head" class:grayscale={disabled}><Head2d {player} isPartOfUsername={true} /></span>
	{/if}{#if prefix}
		<span class="username-rank-prefix">
			{@html formattingCodeToHtml(player.rank.colored)}
		</span>
	{/if}<span class="username" style="color: {player.rank.color}">
		{#if disabled}<span class="strikethrough" />{/if}{player.username}
	</span>
</ConditionalLink>

<style>
	.username {
		/* usernames have the minecraft font */
		font-family: Minecraft, 'Atkinson Hyperlegible', sans-serif;
		/* reduce the size of the text because the font is too big */
		font-size: 0.8em;
		overflow-wrap: anywhere;
		width: 100%;
		/* display: inline-block; */
		position: relative;
	}

	.strikethrough {
		position: absolute;
		right: 0;
		left: 0;
		top: 0.7em;
		display: inline-block;
		width: auto;
		border-bottom: 2px solid #fff;
	}
	.grayscale {
		filter: grayscale(100%);
	}

	.username-rank-prefix {
		font-family: Minecraft, 'Atkinson Hyperlegible', sans-serif;
		font-size: 0.8em;
		overflow-wrap: anywhere;
	}
</style>

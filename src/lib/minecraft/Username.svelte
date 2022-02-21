<script lang="ts">
	import ConditionalLink from '$lib/ConditionalLink.svelte'
	import Head2d from '$lib/minecraft/heads/Head2d.svelte'
	import Head3d from '$lib/minecraft/heads/Head3d.svelte'
	import { formattingCodeToHtml } from '../utils'

	export let player
	export let headType: null | '3d' | '2d' = null
	export let hyperlinkToProfile = false
	export let prefix = false
</script>

<!-- {%- macro username(player, headType=none, hyperlinkToProfile=false, prefix=false) -%}
{%- if hyperlinkToProfile %}<a href="/player/{{ player.username }}{% if hyperlinkToProfile|isString %}/{{ hyperlinkToProfile }}{% endif %}">{% endif -%}
{%- if headType === '3d' %}{{ head3d(player, isPartOfUsername=true) -}}
{%- elif headType === '2d' %}{{ head2d(player, isPartOfUsername=true) -}}
{%- endif -%}
{%- if prefix -%}<span class="username-rank-prefix">{{ player.rank.colored|formattingCodeToHtml|safe }} </span>{%- endif -%}
		<span class="username" style="color: {{ player.rank.color }}">{{ player.username }}</span>
{%- if hyperlinkToProfile %}</a>{% endif -%}
{%- endmacro -%} -->

<ConditionalLink href="/player/{player.username}" isWrapped={hyperlinkToProfile}>
	{#if headType == '3d'}
		<Head3d {player} isPartOfUsername={true} />{:else if headType == '2d'}
		<Head2d {player} isPartOfUsername={true} />
	{/if}{#if prefix}
		<span class="username-rank-prefix">
			{@html formattingCodeToHtml(player.rank.colored)}
		</span>
	{/if}<span class="username" style="color: {player.rank.color}">{player.username}</span>
</ConditionalLink>

<style>
	.username {
		/* usernames have the minecraft font */
		font-family: Minecraft, sans-serif;
		/* reduce the size of the text because the font is too big */
		font-size: 0.8em;
		overflow-wrap: anywhere;
	}

	.username-rank-prefix {
		font-family: Minecraft, sans-serif;
		font-size: 0.8em;
		overflow-wrap: anywhere;
	}
</style>

<script lang="ts">
	import { generateInfobox, prettyTimestamp } from '$lib/profile'
	import Username from '$lib/minecraft/Username.svelte'
	import Emoji from '$lib/Emoji.svelte'

	export let data
</script>

<!-- <div id="infobox">
    <h2>{{ render.username(data.member, prefix=true) }} ({{ data.member.profileName }})</h2>
    <p>{{ '💾'|twemojiHtml|safe }} Last save: {% if getTime() - data.member.last_save < 60 * 60 * 24 * 7 %}{{ ((getTime() - data.member.last_save) * 1000)|cleannumber('time') }} ago {% else %}{{ data.member.last_save|cleannumber('date') }}{% endif %}</p>
    <p>{{ '🚶'|twemojiHtml|safe }} Profile created: {% if getTime() - data.member.first_join < 60 * 60 * 24 * 7 %}{{ ((getTime() - data.member.first_join) * 1000)|cleannumber('time') }} ago {% else %}{{ data.member.first_join|cleannumber('date') }}{% endif %}</p>
    <p>{{ '✨'|twemojiHtml|safe }} Fairy souls: {{ data.member.fairy_souls.total }}/{{ getConstants().max_fairy_souls }}</p>
{%- if data.profile.minion_count == getConstants().max_minions -%}<p>{{ '🤖'|twemojiHtml|safe }} Minion count: {{ data.profile.minion_count }}</p>{% endif %}
{%- set mostSignificantKillsStat = {} -%}
{%- set mostSignificantDeathsStat = {} -%}
{%- for stat in data.member.stats -%}
{%- if stat.category == 'kills' and stat.rawName != 'kills' and stat.value >= 200000 and stat.value > (mostSignificantKillsStat.value or 0) -%}
{%- set mostSignificantKillsStat = stat -%}
{%- endif -%}
{%- if stat.category == 'deaths' and stat.rawName != 'deaths' and stat.value >= 1000000 and stat.value > (mostSignificantDeathsStat.value or 0) -%}
{%- set mostSignificantDeathsStat = stat -%}
{%- endif -%}
{%- endfor -%}
{%- if mostSignificantKillsStat.value -%}
    <p>{{ '⚔️'|twemojiHtml|safe }} {{ mostSignificantKillsStat.value|cleannumber(mostSignificantKillsStat.unit or mostSignificantKillsStat.rawName|clean|lower) }}</p>
{%- endif -%}
{%- if mostSignificantDeathsStat.value -%}
    <p>{{ '☠'|twemojiHtml|safe }} {{ mostSignificantDeathsStat.value|cleannumber(mostSignificantDeathsStat.unit or mostSignificantDeathsStat.rawName|clean|lower) }}</p>
{%- endif -%}
</div> -->

<div id="infobox">
	<h2><Username player={data.member} prefix /> ({data.member.profileName})</h2>
	{#each generateInfobox(data, { meta: false }) as item}
		<p><Emoji value={item} /></p>
	{/each}
</div>

<style>
	#infobox {
		float: right;
		max-width: 95%;
		background-color: rgba(20, 20, 20, 0.4);
		padding: 1em;
		margin-top: 2em;
		width: 20em;
		border-radius: 0.5em;
		box-shadow: 0 0 1em #000;
	}
	p {
		margin: 0 0 0.25em 0;
	}
	@media only screen and (max-width: 600px) {
		#infobox {
			position: relative;
			right: -2em;
			margin-top: 0;
		}
	}
	@media only screen and (max-width: 550px) {
		#infobox {
			position: unset;
			box-shadow: none;
			float: none;
			border: 1px solid var(--theme-lighter-background);
		}
	}
</style>

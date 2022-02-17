<script lang="ts">
	import { formattingCodeToHtml } from '$lib/utils'

	export let item: any | null
	export let isslot = true
	export let pack = ''

	$: itemLoreHtml = item.display.lore.map(l => formattingCodeToHtml(l)).join('<br>')
	$: itemNameHtml = formattingCodeToHtml(item.display.name)
</script>

<!-- {#if data}{/if} -->

<!-- {%- macro item(data, slot=true, pack='') -%}
	{%- if data -%}
		{%- set itemLoreHtml -%}
			{%- for line in data.display.lore -%}
				{{- line|formattingCodeToHtml -}}{% if not loop.last %}<br>{% endif %}
			{%- endfor -%}
		{%- endset -%}
		{%- set itemNameHtml = data.display.name|formattingCodeToHtml -%}
	{%- endif -%}
	<span class="item{% if slot %} item-slot{% endif %}"{% if data %} data-lore-html="{{- itemLoreHtml -}}" data-name-html="{{- itemNameHtml -}}"{% endif %}>
		{%- if data -%}
			{%- set imageUrl = data|itemToUrl(pack) -%}
			{%- if imageUrl -%}
				<img loading="lazy" src="{{ imageUrl }}" alt="{{ data.display.name|removeFormattingCode }}"{% if imageUrl|startsWith('https://mc-heads.net/head/') %} class="item-custom-head"{% endif %}>
			{%- endif -%}
			{%- if data.count != 1 %}<span class="item-count">{{ data.count }}</span>{% endif -%}
		{%- endif -%}
	</span>
{%- endmacro -%} -->

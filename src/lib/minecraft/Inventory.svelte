<script lang="ts">
	import Item from './Item.svelte'

	export let items
	export let name = ''
	export let pack = ''

	if (name === 'inventory')
		// in the inventory, the first 9 items are the hotbar and should be at the end
		items = items.slice(9).concat(items.slice(0, 9))

	// each item group has 9 items
	let itemGroups = []
	$: {
		itemGroups = []
		for (let i = 0; i < items.length; i += 9) {
			itemGroups.push(items.slice(i, i + 9))
		}
	}
</script>

<div class:inventory-container-{name}={name !== ''}>
	{#each itemGroups as itemGroup, groupIndex}
		<div>
			{#each itemGroup as item}
				<Item {item} {pack} isslot />
			{/each}
		</div>
	{/each}
</div>

<!-- {%- macro inventory(items, name='', pack='') -%}
	<div{% if name %} class="inventory-container-{{ name }}"{% endif %}>
		{%- if name == 'inventory' -%}
			{%- set items = items|slice(9)|append(items|slice(0, 9)) -%}
		{%- endif -%}

		{%- for itemData in items -%}
			{%- if loop.index0 > 0 and loop.index0 % 9 == 0 %}</div>{%- endif -%}
			{%- if loop.index0 % 9 == 0 %}<div>{%- endif -%}
			{{- item(itemData, slot=true, pack=pack) -}}
		{%- endfor -%}
		</div>
	</div>
{%- endmacro -%} -->

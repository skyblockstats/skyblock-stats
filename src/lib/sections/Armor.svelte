<script lang="ts">
	import Inventory from '$lib/minecraft/Inventory.svelte'
	export let data
	export let pack
</script>

<Inventory items={data.member.inventories.armor} name="armor" {pack} />

<script lang="ts">
	import Inventory from '$lib/minecraft/Inventory.svelte'
	export let data
	export let pack
</script>

<span>
	<Inventory items={data.member.inventories.armor} name="armor" groupLimit={1} {pack} />
</span>

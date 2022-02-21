<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Inventory from '$lib/minecraft/Inventory.svelte'
	export let data: CleanMemberProfile
	export let pack
</script>

{#if data.member.inventories}
	<span>
		<Inventory items={data.member.inventories.armor} name="armor" groupLimit={1} {pack} />
	</span>
{/if}

<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Inventory from '$lib/minecraft/Inventory.svelte'
	import type { MatcherFile } from 'skyblock-assets'

	export let data: CleanMemberProfile
	export let pack: MatcherFile
</script>

{#if data.member.inventories}
	<span>
		<Inventory items={data.member.inventories.armor} name="armor" groupLimit={1} {pack} />
	</span>
{/if}

<!-- https://stackoverflow.com/a/65837525 -->
<script lang="ts">
	export let isWrapped = false;
	export let href: string;
</script>

{#if isWrapped}
	<a {href}>
		<slot />
	</a>
{:else}
	<slot />
{/if}

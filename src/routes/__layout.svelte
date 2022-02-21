<script lang="ts">
	import '../app.css'
	import GlobalTooltip from '$lib/layout/GlobalTooltip.svelte'
	import Loader from '$lib/layout/Loader.svelte'
</script>

<Loader />
<GlobalTooltip />
<nav />
<slot />

<script lang="ts">
	import { goto } from '$app/navigation'

	export let value = ''
</script>

<form
	action="/player"
	method="post"
	class="user-form"
	on:submit={e => {
		goto(`/player/${value}`)
		e.preventDefault()
	}}
>
	<input
		type="text"
		placeholder="Enter username"
		name="user-search"
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
		aria-label="Enter username"
		required
		bind:value
	/>
	<slot />
</form>

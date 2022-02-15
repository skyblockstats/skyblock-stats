<script lang="ts">
	import { goto } from '$app/navigation'

	export let backArrowHref = '/'
	let searchUserValue: string = ''
</script>

<header id="main-header">
	<a href={backArrowHref} class="back-arrow-anchor" aria-label="back">
		<svg class="back-arrow" height="33" width="23">
			<path d="M 14 0 l -13 13 l 13 13" stroke-width="2" fill="none" />
		</svg>
	</a>
	<form
		action="/player"
		method="post"
		class="user-form"
		on:submit={e => {
			goto(`/player/${searchUserValue}`)
			e.preventDefault()
		}}
	>
		<input
			class="enter-username-button"
			type="text"
			placeholder="Enter username"
			name="user-search"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="false"
			aria-label="Enter username"
			bind:value={searchUserValue}
		/>
	</form>
</header>

<script lang="ts">
	import { enhance } from '$lib/form'

	export let backArrowHref = '/'
</script>

<header id="main-header">
	<a href={backArrowHref} class="back-arrow-anchor" aria-label="back">
		<svg class="back-arrow" height="33" width="23">
			<path d="M 14 0 l -13 13 l 13 13" stroke-width="2" fill="none" />
		</svg>
	</a>
	<form action="/player" method="post" class="user-form" use:enhance>
		<!-- use:enhance={{
			result: async ({ form }) => {
				form.reset()
			},
		}} -->
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
		/>
	</form>
</header>

<script lang="ts">
	export let loggedIn: boolean
</script>

<div class="login-button-container">
	{#if loggedIn}
		<a href="/profile"><button class="login-button">Edit profile</button></a>
	{:else}
		<a href="/login" rel="external">
			<button class="login-button"
				><img src="/discord-mark-light.svg" alt="Discord logo" />Log in with Discord</button
			>
		</a>
	{/if}
</div>

<style>
	.login-button-container {
		position: absolute;
		top: 0.5em;
		right: 0.5em;
	}
	.login-button {
		color: var(--theme-main-text);
	}
	img {
		height: 1em;
		vertical-align: middle;
		margin-right: 0.3em;
		opacity: 0.9;
	}
</style>

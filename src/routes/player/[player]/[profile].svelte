<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player
		const profile: string = params.profile
		const res = await fetch(`${API_URL}player/${player}/${profile}?customization=true`).then(r =>
			r.json()
		)
		return {
			props: {
				data: res,
			},
		}
	}
</script>

<script lang="ts">
	import Head from '$lib/Head.svelte'
	import Emoji from '$lib/Emoji.svelte'
	import Header from '$lib/Header.svelte'
	import Username from '$lib/Username.svelte'
	import { generateMetaDescription } from '$lib/profile'
	import { twemojiHtml } from '$lib/utils'

	export let data
</script>

<Head
	title="{data.member.username}'s SkyBlock profile ({data.member.profileName})"
	description={generateMetaDescription(data)}
	metaTitle={(data.member.rank.name ? `[${data.member.rank.name}] ` : '') +
		`${data.member.username}\'s SkyBlock profile (${data.member.profileName})`}
/>
<Header backArrowHref="/player/{data.member.username}" />

<main>
	<h1>
		<Username player={data.member} headType="3d" />
		{#if data.customization?.emoji}
			<span class="profile-emoji"><Emoji value={data.customization.emoji} /></span>
		{/if}
		({data.member.profileName})
	</h1>
</main>

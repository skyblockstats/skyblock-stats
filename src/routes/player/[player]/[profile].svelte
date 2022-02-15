<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const player: string = params.player
		const profile: string = params.profile
		const res = await fetch(`${API_URL}player/${player}/${profile}`).then(r => r.json())
		return {
			props: {
				data: res,
			},
		}
	}
</script>

<script lang="ts">
	import Head from '$lib/Head.svelte'
	import Header from '$lib/Header.svelte'
	import Username from '$lib/Username.svelte'
	import { generateMetaDescription } from '$lib/profile'

	export let data
</script>

<Head
	title="{data.member.username}'s SkyBlock profile ({data.member.profileName})"
	description={generateMetaDescription(data)}
	metaTitle={(data.member.rank.name ? `[${data.member.rank.name}] ` : '') +
		`${data.member.username}\'s SkyBlock profile (${data.member.profileName})`}
/>
<Header backArrowHref="/player/{data.member.username}" />

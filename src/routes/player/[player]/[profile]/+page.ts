import type { CleanMemberProfile } from '$lib/APITypes'
import type { PageLoad } from './$types'
import { loadPack } from '$lib/packs'
import { fetchApi } from '$lib/api'
import { error, redirect } from '@sveltejs/kit'

export const load = (async ({ params, fetch, url }) => {
	const player: string = params.player
	const profile: string = params.profile
	const data: CleanMemberProfile = await fetchApi(
		`player/${player}/${profile}?customization=true`,
		fetch
	).then(async r => {
		const text = await r.text()
		try {
			return JSON.parse(text)
		} catch (e) {
			throw new Error(`Invalid JSON: ${text}`)
		}
	})

	if (!data.member) {
		throw error(404, 'Unknown profile')
	}

	if (data.member.username !== player) {
		throw redirect(302, `/player/${data.member.username}/${data.profile.name}`)
	}
	if (!data.member.left && data.profile.name !== profile) {
		throw redirect(302, `/player/${data.member.username}/${data.profile.name}`)
	}

	const packName = url.searchParams.get('pack') ?? data?.customization?.pack
	const pack = await loadPack(packName)

	return {
		...data,
		pack,
	}
}) satisfies PageLoad

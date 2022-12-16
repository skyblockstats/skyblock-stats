import type { PageLoad } from './$types'
import { fetchApi } from '$lib/api'
import { error, redirect } from '@sveltejs/kit'

export const load = (async ({ params, fetch }) => {
	const player: string = params.player!

	const data = await fetchApi(`player/${player}?customization=true`, fetch).then(r => r.json())

	if (!data.player) {
		throw error(404, 'Unknown player')
	}

	if (data.player.username !== player) {
		throw redirect(302, `/player/${data.player.username}`)
	}

	return data
}) satisfies PageLoad

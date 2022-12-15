import type { PageLoad } from './$types'
import { fetchApi } from '$lib/api'

export const load = (async ({ params, fetch }) => {
	const player: string = params.player!

	const data = await fetchApi(`player/${player}?customization=true`, fetch).then(r => r.json())

	if (!data.player) {
		return {
			status: 404,
			error: 'Unknown player',
		}
	}

	if (data.player.username !== player) {
		return {
			redirect: `/player/${data.player.username}`,
			status: 302,
		} as any
	}

	return data
}) satisfies PageLoad

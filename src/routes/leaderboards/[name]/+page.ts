import type { PageLoad } from './$types'
import { fetchApi } from '$lib/api'
import { error } from '@sveltejs/kit'

export const load = (async ({ params, fetch }) => {
	const dataText = await fetchApi(`leaderboards/${params.name}`, fetch).then(r => r.text())

	const data = JSON.parse(dataText)

	if (data.list.length === 0) throw error(404, 'Unknown leaderboard')

	return data
}) satisfies PageLoad

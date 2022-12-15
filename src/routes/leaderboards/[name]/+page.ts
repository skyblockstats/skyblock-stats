import type { PageData } from './$types'
import { fetchApi } from '$lib/api'

export const load = (async ({ params, fetch }) => {
	const dataText = await fetchApi(`leaderboards/${params.name}`, fetch).then(r => r.text())

	const data = JSON.parse(dataText)

	if (data.list.length === 0) return { status: 404, error: 'Unknown leaderboard' }

	return {
		props: {
			data,
		},
	} as any
}) satisfies PageData

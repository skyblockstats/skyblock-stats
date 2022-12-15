import type { PageData } from './$types'
import { fetchApi } from '$lib/api'

export const load = (async ({ fetch }) => {
	return await fetchApi(`leaderboards`, fetch).then(r => r.json())
}) satisfies PageData

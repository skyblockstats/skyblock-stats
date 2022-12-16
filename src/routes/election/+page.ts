import { fetchApi } from '$lib/api'
import type { PageLoad } from './$types'

export const load = (async ({ fetch }) => {
	return await fetchApi(`election?t=${Math.floor(Date.now() / 1000)}`, fetch).then(r =>
		r.json()
	)
}) satisfies PageLoad

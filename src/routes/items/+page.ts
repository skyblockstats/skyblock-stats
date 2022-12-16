import { fetchApi } from '$lib/api'
import type { PageLoad } from './$types'

export const load = (async ({ fetch }) => {
	return await fetchApi(`items`, fetch).then(r => r.json())
}) satisfies PageLoad

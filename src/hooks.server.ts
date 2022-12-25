import { API_URL } from '$lib/api'
import env from '$lib/env'
import type { Handle, HandleFetch } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
	event.locals.sid = event.cookies.get('sid')
	const response = await resolve(event)
	return response
}) satisfies Handle

export const handleFetch = (async ({ request, fetch, event }) => {
	if (request.url.startsWith(API_URL)) {
		const { SKYBLOCK_STATS_API_KEY } = env(event.platform)
		if (SKYBLOCK_STATS_API_KEY) {
			request.headers.set('key', SKYBLOCK_STATS_API_KEY)
		}
	}

	return fetch(request)
}) satisfies HandleFetch

import type { Handle } from '@sveltejs/kit'

export const handle = (async ({ event, resolve }) => {
	event.locals.sid = event.cookies.get('sid')
	const response = await resolve(event)
	return response
}) satisfies Handle
import type { ServerLoad } from '@sveltejs/kit'

export const load = (({ locals }) => {
	return {
		loggedIn: locals.sid !== undefined,
	}
}) satisfies ServerLoad

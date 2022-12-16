import type { ServerLoad } from '@sveltejs/kit'

export const load = (({ locals }) => {
	return {
		sid: locals.sid
	}
}) satisfies ServerLoad

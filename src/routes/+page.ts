import type { PageData } from './$types'

export const load = (({ session }) => {
	return {
		loggedIn: session.sid !== undefined,
	}
}) satisfies PageData

import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

export const load = (async ({ data, url }) => {
	if (data.sid === undefined) {
		throw redirect(303, '/login')
	}
	return {
		errorCode: url.searchParams.get('error'),
		current: url.searchParams.get('current'),
		correct: url.searchParams.get('correct'),
	}
}) satisfies PageLoad

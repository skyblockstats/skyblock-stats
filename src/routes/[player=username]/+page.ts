import type { PageLoad } from './$types'


export const get = (({ params }) => {
	return {
		status: 303,
		headers: {
			location: `/player/${params.player}`
		}
	}
}) satisfies PageLoad
import { fetchApi } from '$lib/api'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ locals, url }) => {
	// if the sid is wrong, nothing to do
	if (url.searchParams.has('sid') && url.searchParams.get('sid') === locals.sid) {
		await fetchApi(`accounts/session`, fetch, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				uuid: locals.sid
			}),
		}).then(res => {
			if (res.status !== 200)
				throw new Error(res.statusText)
		})
	}
	return {
		status: 303,
		headers: {
			location: '/',
			'Set-Cookie': 'sid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'
		}
	}

}

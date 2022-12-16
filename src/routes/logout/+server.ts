import { fetchApi } from '$lib/api'
import { redirect, type RequestHandler } from '@sveltejs/kit'

export const GET = (async ({ url, cookies, locals }) => {
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

	cookies.delete('sid')
	throw redirect(303, '/')
}) as RequestHandler

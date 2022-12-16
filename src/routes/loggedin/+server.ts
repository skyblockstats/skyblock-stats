import { fetchApi } from '$lib/api'
import { redirect, type RequestHandler, } from '@sveltejs/kit'

export const GET = (async ({ url, cookies }) => {
	const code = url.searchParams.get('code')
	const redirectUri = `${url.protocol}//${url.host}/loggedin`
	const response = await fetchApi(`accounts/createsession`, fetch, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			code,
			redirectUri: redirectUri
		}),
	}).then(res => {
		if (res.status !== 200)
			throw new Error(res.statusText)
		return res.json()
	})

	if (response.ok) {
		cookies.set('sid', response.session_id, {
			maxAge: 31536000000,
			httpOnly: true,
		})
		throw redirect(303, '/verify')
	}
	throw redirect(303, '/login')
}) satisfies RequestHandler

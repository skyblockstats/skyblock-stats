import { fetchApi } from '$lib/api'
import { error, redirect, type RequestHandler, } from '@sveltejs/kit'

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
	}).then(async res => {
		if (res.status !== 200)
			throw error(500, `Non-200 response from API: ${res.status} ${await res.text()}`)
		return await res.json()
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

import { fetchApi } from '$lib/api'
import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ url }) => {
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
		return {
			status: 303,
			headers: {
				location: '/verify',
				'Set-Cookie': `sid=${response.session_id}; Max-Age=31536000000; Path=/; HttpOnly`
			}
		}
	}
	return {
		status: 303,
		headers: {
			location: '/login',
		}
	}
}

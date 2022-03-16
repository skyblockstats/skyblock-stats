import { API_URL } from '$lib/api'
import type { RequestHandler } from '@sveltejs/kit'
import type { JSONValue } from '@sveltejs/kit/types/internal'

export const get: RequestHandler = async ({ params }) => {
	const code = params.code
	const response = await fetch(`${API_URL}accounts/createsession`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			code
		}),
	}).then(res => {
		if (res.status !== 200)
			throw new Error(res.statusText)
		return res.json()
	})
	console.log(response)
	if (response.ok) {
		return {
			status: 303,
			headers: {
				location: '/verify',
				'Set-Cookie': `sid=${response.session_id}; Max-Age=31536000000; Path=/; HttpOnly; SameSite=Strict`
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

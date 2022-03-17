import { API_URL } from '$lib/api'
import type { RequestHandler } from '@sveltejs/kit'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
if (!DISCORD_CLIENT_ID)
	console.warn('DISCORD_CLIENT_ID is not set as an environment variable. This is required for logging in with Discord to work.')

export const get: RequestHandler = async ({ request, params, locals, url }) => {
	// if the sid is wrong, nothing to do
	console.log(url.searchParams.get('sid'), locals.sid)
	if (url.searchParams.has('sid') && url.searchParams.get('sid') === locals.sid) {
		console.log('ok sent logout')
		await fetch(`${API_URL}accounts/session`, {
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

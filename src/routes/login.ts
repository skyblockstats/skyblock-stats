import type { RequestHandler } from '@sveltejs/kit'

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID
if (!DISCORD_CLIENT_ID)
	console.warn('DISCORD_CLIENT_ID is not set as an environment variable. This is required for logging in with Discord to work.')

export const get: RequestHandler = async ({ request }) => {
	const host = request.headers.get('host')
	if (!DISCORD_CLIENT_ID)
		return {
			status: 500,
			headers: {
				'content-type': 'text/plain',
			},
			body: 'DISCORD_CLIENT_ID is not set as an environment variable. Please contact the owner of the website if this was expected to work.',
		}

	if (!host)
		return {
			status: 400,
			headers: {
				'content-type': 'text/plain',
			},
			body: 'Host header is required.',
		}

	const protocol = request.url.startsWith('https') ? 'https' : 'http'

	return {
		status: 303,
		headers: {
			location: `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${protocol}://${host}%2Floggedin&response_type=code&scope=identify`
		}
	}
}

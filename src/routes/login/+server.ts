import env from '$lib/env'
import { error, redirect, type RequestHandler } from '@sveltejs/kit'

export const GET = (async ({ request, platform }) => {
	const host = request.headers.get('host')

	const clientId = env(platform).DISCORD_CLIENT_ID

	if (!clientId)
		throw error(500, 'DISCORD_CLIENT_ID is not set as an environment variable. Please contact the owner of the website if this was expected to work.')

	if (!host)
		throw error(400, 'Host header is required.')

	const protocol = request.url.startsWith('https') ? 'https' : 'http'

	throw redirect(303, `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${protocol}://${host}%2Floggedin&response_type=code&scope=identify`)
}) satisfies RequestHandler

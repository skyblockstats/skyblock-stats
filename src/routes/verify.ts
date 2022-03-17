import { API_URL } from '$lib/api'
import type { AccountSchema, CleanUser, SessionSchema } from '$lib/APITypes'
import type { RequestHandler } from '@sveltejs/kit'

function redirect(status: number, location: string) {
	return {
		status,
		headers: {
			location,
		},
	}
}

export const post: RequestHandler = async ({ request, locals }) => {
	console.log('ok!')
	if (!process.env.SKYBLOCK_STATS_API_KEY) {
		return redirect(303, `/verify?error=NO_KEY`)
	}
	console.log('sid check')
	if (locals.sid === undefined) {
		// return {
		// 	status: 303,
		// 	redirect: '/login',
		// }
		return redirect(303, '/login')
	}

	const form = await request.formData()

	// username or uuid
	const playerIdentifier = form.get('ign')
	console.log('ign check')
	if (!playerIdentifier) {
		// return {
		// 	status: 303,
		// 	redirect: '/verify?error=NO_IGN',
		// }
		return redirect(303, `/verify?error=NO_IGN`)
	}

	const playerResponse: CleanUser = await fetch(`${API_URL}player/${playerIdentifier}`).then(res => res.json())
	const sessionResponse: { session: SessionSchema | null, account: AccountSchema | null } = await fetch(`${API_URL}accounts/session`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			uuid: locals.sid,
		}),
	}).then(r => r.json())

	console.log('session check')
	if (!sessionResponse.session)
		// return {
		// 	status: 303,
		// 	redirect: '/login',
		// }
		return redirect(303, '/login')

	const hypixelDiscordName = playerResponse.player?.socials.discord

	console.log('discord check')
	if (!hypixelDiscordName)
		// return {
		// 	status: 303,
		// 	redirect: '/verify?error=NOT_LINKED',
		// }
		return redirect(303, `/verify?error=NOT_LINKED`)


	const discordUser = sessionResponse.session.discord_user
	const actualDiscordName = discordUser.name
	// some people link themselves as <id>#<discrim> instead of <name>#<discrim>
	const actualDiscordIdDiscrim = `${discordUser.id}#${discordUser.name.split('#')[1]}`

	console.log('name check')
	if (!(hypixelDiscordName === actualDiscordName || hypixelDiscordName === actualDiscordIdDiscrim))
		// return {
		// 	status: 303,
		// 	redirect: `/verify?error=WRONG_NAME?current=${hypixelDiscordName}&correct=${actualDiscordName}`,
		// }
		return redirect(303, `/verify?error=WRONG_NAME&current=${encodeURIComponent(hypixelDiscordName)}&correct=${encodeURIComponent(actualDiscordName)}`)

	const updatedAccount: AccountSchema = {
		discordId: sessionResponse.session.discord_user.id,
		minecraftUuid: playerResponse.player?.uuid
	}

	await fetch(`${API_URL}accounts/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			key: process.env.SKYBLOCK_STATS_API_KEY
		},
		body: JSON.stringify(updatedAccount),
	}).then(r => r.json())

	console.log('epic')
	// return {
	// 	status: 303,
	// 	redirect: '/profile'
	// }
	return redirect(303, '/profile')
}
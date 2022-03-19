import { API_URL } from '$lib/api'
import type { AccountSchema, CleanUser, SessionSchema } from '$lib/APITypes'
import type { RequestHandler } from '@sveltejs/kit'
import env from '../env'


function redirect(status: number, location: string) {
	return {
		status,
		headers: {
			location,
		},
	}
}

export const post: RequestHandler = async ({ request, locals, platform }) => {
	const key = env(platform).SKYBLOCK_STATS_API_KEY
	if (!key) {
		return redirect(303, `/verify?error=NO_KEY`)
	}
	if (locals.sid === undefined) {
		return redirect(303, '/login')
	}

	const form = await request.formData()

	// username or uuid
	const playerIdentifier = form.get('ign')
	if (!playerIdentifier) {
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

	if (!sessionResponse.session)
		return redirect(303, '/login')

	const hypixelDiscordName = playerResponse.player?.socials.discord

	if (!hypixelDiscordName)
		return redirect(303, `/verify?error=NOT_LINKED`)

	const discordUser = sessionResponse.session.discord_user
	const actualDiscordName = discordUser.name
	// some people link themselves as <id>#<discrim> instead of <name>#<discrim>
	const actualDiscordIdDiscrim = `${discordUser.id}#${discordUser.name.split('#')[1]}`

	if (!(hypixelDiscordName === actualDiscordName || hypixelDiscordName === actualDiscordIdDiscrim))
		return redirect(303, `/verify?error=WRONG_NAME&current=${encodeURIComponent(hypixelDiscordName)}&correct=${encodeURIComponent(actualDiscordName)}`)

	const updatedAccount: AccountSchema = {
		discordId: sessionResponse.session.discord_user.id,
		minecraftUuid: playerResponse.player?.uuid
	}

	await fetch(`${API_URL}accounts/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			key: key
		},
		body: JSON.stringify(updatedAccount),
	}).then(r => r.json())

	return redirect(303, '/profile')
}
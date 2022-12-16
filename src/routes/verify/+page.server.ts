import { fetchApi } from '$lib/api'
import type { AccountSchema, CleanUser, SessionSchema } from '$lib/APITypes'
import { redirect, type RequestHandler, type ServerLoad } from '@sveltejs/kit'
import env from '$lib/env'
import type { Actions } from './$types'


export const actions: Actions = {
	default: async ({ platform, locals, request }) => {
		const key = env(platform).SKYBLOCK_STATS_API_KEY
		if (!key) {
			throw redirect(303, `/verify?error=NO_KEY`)
		}
		if (locals.sid === undefined) {
			throw redirect(303, '/login')
		}

		const form = await request.formData()

		// username or uuid
		const playerIdentifier = form.get('ign')
		if (!playerIdentifier) {
			throw redirect(303, `/verify?error=NO_IGN`)
		}

		const playerResponse: CleanUser = await fetchApi(`player/${playerIdentifier}`, fetch).then(res => res.json())
		const sessionResponse: { session: SessionSchema | null, account: AccountSchema | null } = await fetchApi(`accounts/session`, fetch, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				uuid: locals.sid,
			}),
		}).then(r => r.json())

		if (!sessionResponse.session)
			throw redirect(303, '/login')

		const hypixelDiscordName = playerResponse.player?.socials.discord

		if (!hypixelDiscordName)
			throw redirect(303, `/verify?error=NOT_LINKED`)

		const discordUser = sessionResponse.session.discord_user
		const actualDiscordName = discordUser.name
		// some people link themselves as <id>#<discrim> instead of <name>#<discrim>
		const actualDiscordIdDiscrim = `${discordUser.id}#${discordUser.name.split('#')[1]}`

		if (!(hypixelDiscordName === actualDiscordName || hypixelDiscordName === actualDiscordIdDiscrim))
			throw redirect(303, `/verify?error=WRONG_NAME&current=${encodeURIComponent(hypixelDiscordName)}&correct=${encodeURIComponent(actualDiscordName)}`)

		const updatedAccount: AccountSchema = {
			discordId: sessionResponse.session.discord_user.id,
			minecraftUuid: playerResponse.player?.uuid
		}

		await fetchApi(`accounts/update`, fetch, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				key: key
			},
			body: JSON.stringify(updatedAccount),
		}).then(r => r.json())

		throw redirect(303, '/profile')
	}
}

export const load = (({ locals }) => {
	return {
		sid: locals.sid
	}
}) satisfies ServerLoad

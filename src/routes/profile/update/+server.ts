import { fetchApi } from '$lib/api'
import type { AccountSchema, SessionSchema } from '$lib/APITypes'
import backgroundFileNames from '../../../_backgrounds.json'
import donators from '../../../_donators.json'
import admins from '../../../_admins.json'
import env from '$lib/env'
import type { PageServerLoad } from '../$types'
import { error, json } from '@sveltejs/kit'

const emojiRegex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/

function isValidEmoji(emoji: string) {
	const match = emojiRegex.exec(emoji)
	return match && match[0] === emoji && match.index === 0
}


export const PATCH = (async ({ request, locals, platform }) => {
	if (locals.sid === undefined) {
		throw error(401, 'You are not logged in.')
	}
	const key = env(platform).SKYBLOCK_STATS_API_KEY
	if (!key) {
		throw error(500, 'The SKYBLOCK_STATS_API_KEY environment variable is not set.')
	}
	const data = await request.json()

	const sessionResponse: { session: SessionSchema | null, account: AccountSchema | null } = await fetchApi(`accounts/session`, fetch, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			uuid: locals.sid,
		}),
	}).then(r => r.json())
	if (!sessionResponse.session || !sessionResponse.account?.minecraftUuid)
		throw error(401, 'Invalid session.')

	const backgroundName = data.backgroundName
	const pack = data.pack
	const blurBackground = data.blurBackground
	const emoji = data.emoji

	const isDonator = donators.find(d => d.uuid === sessionResponse.account?.minecraftUuid) !== undefined
	const isAdmin = admins.includes(sessionResponse.account?.minecraftUuid)

	if (typeof backgroundName !== 'undefined' && typeof backgroundName !== 'string') {
		throw error(400, 'Invalid background.')
	}
	if (typeof pack !== 'string') {
		throw error(400, 'Invalid pack.')
	}
	if (typeof blurBackground !== 'boolean') {
		throw error(400, 'Invalid blurBackground.')
	}
	if (typeof emoji !== 'undefined' && typeof emoji !== 'string') {
		throw error(400, 'Invalid emoji.')
	}

	// prevent people from putting non-existent backgrounds
	if (backgroundName && !backgroundFileNames.includes(backgroundName))
		throw error(400, 'Invalid background.')
	const backgroundUrl = backgroundName ? `/backgrounds/${backgroundName}` : undefined

	if (emoji) {
		if (!isDonator && !isAdmin)
			throw error(401, 'You are not allowed to use emojis.')
		if (!isValidEmoji(emoji))
			throw error(400, 'Invalid emoji.')
	}

	const updatedAccount: AccountSchema = {
		discordId: sessionResponse.account.discordId,
		customization: {
			backgroundUrl,
			pack,
			blurBackground,
			emoji,
		},
	}

	const response = await fetchApi(`accounts/update`, fetch, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			key: key
		},
		body: JSON.stringify(updatedAccount),
	}).then(r => r.json())
	console.log(response)


	return json({ ok: true })
}) satisfies PageServerLoad
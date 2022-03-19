import { API_URL } from '$lib/api'
import type { AccountSchema, SessionSchema } from '$lib/APITypes'
import type { RequestHandler } from '@sveltejs/kit'
import backgroundFileNames from '../../_backgrounds.json'
import donators from '../../_donators.json'
import admins from '../../_admins.json'
import type { JSONValue } from '@sveltejs/kit/types/internal'
import env from '$lib/env'

const emojiRegex = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/

function isValidEmoji(emoji: string) {
	const match = emojiRegex.exec(emoji)
	return match && match[0] === emoji && match.index === 0
}


export const patch: RequestHandler = async ({ request, locals, platform }) => {
	if (locals.sid === undefined) {
		return {
			body: { ok: false, error: 'You are not logged in.' },
			status: 401,
		}
	}
	const key = env(platform).SKYBLOCK_STATS_API_KEY
	if (!key) {
		return {
			body: { ok: false, error: 'The SKYBLOCK_STATS_API_KEY environment variable is not set.' },
			status: 500,
		}
	}
	const data = await request.json()

	const sessionResponse: { session: SessionSchema | null, account: AccountSchema | null } = await fetch(`${API_URL}accounts/session`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			uuid: locals.sid,
		}),
	}).then(r => r.json())
	if (!sessionResponse.session || !sessionResponse.account?.minecraftUuid)
		return {
			body: { ok: false, error: 'Invalid session.' },
			status: 401,
		}

	const backgroundName = data.backgroundName
	const pack = data.pack
	const blurBackground = data.blurBackground
	const emoji = data.emoji

	const isDonator = donators.find(d => d.uuid === sessionResponse.account?.minecraftUuid) !== undefined
	const isAdmin = admins.includes(sessionResponse.account?.minecraftUuid)

	if (typeof backgroundName !== 'undefined' && typeof backgroundName !== 'string') {
		return {
			body: { ok: false, error: 'Invalid background.' },
			status: 400,
		}
	}
	if (typeof pack !== 'string') {
		return {
			body: { ok: false, error: 'Invalid pack.' },
			status: 400,
		}
	}
	if (typeof blurBackground !== 'boolean') {
		return {
			body: { ok: false, error: 'Invalid blurBackground.' },
			status: 400,
		}
	}
	if (typeof emoji !== 'undefined' && typeof emoji !== 'string') {
		return {
			body: { ok: false, error: 'Invalid emoji.' },
			status: 400,
		}
	}

	// prevent people from putting non-existent backgrounds
	if (backgroundName && !backgroundFileNames.includes(backgroundName))
		return {
			body: { ok: false, error: 'Invalid background.' },
			status: 400,
		}
	const backgroundUrl = backgroundName ? `/backgrounds/${backgroundName}` : undefined

	if (emoji) {
		if (!isDonator && !isAdmin)
			return {
				body: { ok: false, error: 'You are not allowed to use emojis.' },
				status: 401,
			}
		if (!isValidEmoji(emoji))
			return {
				body: { ok: false, error: 'Invalid emoji.' },
				status: 400,
			}
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

	const response = await fetch(`${API_URL}accounts/update`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			key: key
		},
		body: JSON.stringify(updatedAccount),
	}).then(r => r.json())


	return {
		body: { ok: true } as JSONValue,
	}
}
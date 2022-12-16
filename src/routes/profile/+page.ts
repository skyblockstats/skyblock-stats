import { fetchApi } from '$lib/api'
import type { AccountSchema, SessionSchema } from '$lib/APITypes'
import donators from '../../_donators.json'
import admins from '../../_admins.json'
import type { PageLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load = (async ({ fetch, data }) => {
	const sessionResponse: { session: SessionSchema | null; account: AccountSchema | null } | null =
		await fetchApi(`accounts/session`, fetch, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				uuid: data.sid,
			}),
		}).then(r => r.json())

	const playerResponse = sessionResponse?.account
		? await fetchApi(`player/${sessionResponse.account.minecraftUuid}`, fetch).then(r => r.json())
		: null

	// redirect to /login if the user is not logged in
	if (
		!sessionResponse ||
		!sessionResponse.account ||
		!sessionResponse.session ||
		!playerResponse.player
	) {
		throw redirect(303, '/login')
	}

	const isDonator =
		donators.find(d => d?.uuid === sessionResponse.account?.minecraftUuid) !== undefined
	const isAdmin = admins.find(a => a === sessionResponse.account?.minecraftUuid) !== undefined

	return {
		session: sessionResponse.session,
		account: sessionResponse.account,
		player: playerResponse,
		isDonator: isDonator || isAdmin,
	}
}) as PageLoad

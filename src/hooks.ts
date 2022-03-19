import cookie from 'cookie'
import type { ExternalFetch, GetSession, Handle } from '@sveltejs/kit'


export const handle: Handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '')

	event.locals.sid = cookies.sid

	const response = await resolve(event)

	return response
}

export const getSession: GetSession = async ({ locals }) => {
	return {
		sid: locals.sid
	}
}

export const externalFetch: ExternalFetch = async (request) => {
	const response = await fetch(request)

	return response
}
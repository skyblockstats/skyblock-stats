import type { ParamMatcher, RequestHandler } from '@sveltejs/kit'

export const match: ParamMatcher = (param) => {
	return /^\w{2,16}$/.test(param)
}

export const get: RequestHandler = async ({ params }) => {
	return {
		status: 303,
		headers: {
			location: `/player/${params.player}`
		}
	}
}
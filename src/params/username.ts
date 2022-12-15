import type { ParamMatcher } from '@sveltejs/kit'

export const match = ((param) => {
	return /^\w{2,16}$/.test(param)
}) satisfies ParamMatcher
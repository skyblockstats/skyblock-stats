import env from './env'

// the trailing slash is required
const API_URL = 'https://skyblock-api.matdoes.dev/'
// export const API_URL = 'http://localhost:8080/'

export async function fetchApi(path: string, fetch: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>, init?: RequestInit | undefined) {
	const { SKYBLOCK_STATS_API_KEY } = env()
	if (SKYBLOCK_STATS_API_KEY) {
		init = init || {}
		if (!init.headers)
			init.headers = {}
		init.headers['key'] = SKYBLOCK_STATS_API_KEY
	}

	const response = await fetch(API_URL + path, init)
	return response
}
// the trailing slash is required
export const API_URL = 'https://skyblock-api.matdoes.dev/'
// export const API_URL = 'http://localhost:8080/'

export async function fetchApi(path: string, fetch: (info: RequestInfo, init?: RequestInit | undefined) => Promise<Response>, init?: RequestInit | undefined) {
	// the header is set in hooks.server.ts
	const response = await fetch(API_URL + path, init)
	return response
}
const BASE_URL = 'https://skyblock-api.matdoes.dev/'

export async function get(path: string) {
    const resp = await fetch(BASE_URL + path)
    return await resp.json()
}


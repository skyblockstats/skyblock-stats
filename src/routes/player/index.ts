import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler = async ({ request }) => {
    const form = await request.formData()

    const player = form.get('user-search')

    return {
        status: 303,
        headers: {
            location: `/player/${player}`
        }
    }
}
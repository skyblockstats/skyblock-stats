import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData()

        const player = form.get('user-search')

        return {
            status: 303,
            headers: {
                location: `/player/${player}`
            }
        }
    }
}
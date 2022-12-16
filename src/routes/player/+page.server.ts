import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await request.formData()

        const player = form.get('user-search')

        throw redirect(303, `/player/${player}`)
    }
}
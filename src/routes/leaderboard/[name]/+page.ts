import { redirect } from '@sveltejs/kit'
import type { PageLoad } from './$types'

// The route /leaderboard/<name> was moved to /leaderboards/<name> for
// consistency.
export const get = (({ params }) => {
    throw redirect(303, `/leaderboards/${params.name}`)
}) satisfies PageLoad

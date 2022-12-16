import { redirect, type RequestHandler } from '@sveltejs/kit'

// The route /leaderboard/<name> was moved to /leaderboards/<name> for
// consistency.
export const GET = (({ params }) => {
    throw redirect(303, `/leaderboards/${params.name}`)
}) satisfies RequestHandler

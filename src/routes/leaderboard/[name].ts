import type { RequestHandler } from '@sveltejs/kit'

// The route /leaderboard/<name> was moved to /leaderboards/<name> for
// consistency.
export const get: RequestHandler = ({ params }) => {
    return {
        status: 303,
        headers: {
            location: `/leaderboards/${params.name}`
        }
    }
}

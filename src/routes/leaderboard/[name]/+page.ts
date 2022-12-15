import type { PageLoad } from './$types'

// The route /leaderboard/<name> was moved to /leaderboards/<name> for
// consistency.
export const get = (({ params }) => {
    return {
        status: 303,
        headers: {
            location: `/leaderboards/${params.name}`
        }
    }
}) satisfies PageLoad

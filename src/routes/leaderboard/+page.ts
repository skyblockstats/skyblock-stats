import type { PageLoad } from './$types'

export const load = (() => {
    return {
        status: 303,
        headers: {
            location: '/leaderboards'
        }
    }
}) satisfies PageLoad

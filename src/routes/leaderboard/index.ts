export async function get({ request }) {
    return {
        status: 303,
        headers: {
            location: '/leaderboards'
        }
    }
}

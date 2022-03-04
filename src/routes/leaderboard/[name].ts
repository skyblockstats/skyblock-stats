// The route /leaderboard/<name> was moved to /leaderboards/<name> for
// consistency.
export async function get({ params }) {
    return {
        status: 303,
        headers: {
            location: `/leaderboards/${params.name}`
        }
    }
}

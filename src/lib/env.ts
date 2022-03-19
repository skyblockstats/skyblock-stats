let skyblockStatsApiKey: string | undefined
let discordClientId: string | undefined

export default function env(platform?: Readonly<App.Platform>) {
	try {
		skyblockStatsApiKey = process.env.SKYBLOCK_STATS_API_KEY
	} catch {
		skyblockStatsApiKey = platform?.env.SKYBLOCK_STATS_API_KEY
	}
	if (!skyblockStatsApiKey)
		console.warn('SKYBLOCK_STATS_API_KEY is not set as an environment variable. This is required for logging in with Discord to work. It should be the same as the `key` environment variable in skyblock-api.')

	try {
		discordClientId = process.env.DISCORD_CLIENT_ID
	} catch {
		discordClientId = platform?.env.DISCORD_CLIENT_ID
	}
	if (!discordClientId)
		console.warn('DISCORD_CLIENT_ID is not set as an environment variable. This is required for logging in with Discord to work.')

	return {
		SKYBLOCK_STATS_API_KEY: skyblockStatsApiKey,
		DISCORD_CLIENT_ID: discordClientId,
	}
}
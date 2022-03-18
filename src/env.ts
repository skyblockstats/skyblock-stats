// Cloudflare Workers can't read process.env so we have to do it like this

let skyblockStatsApiKey: string | undefined
try {
	skyblockStatsApiKey = process.env.SKYBLOCK_STATS_API_KEY
} catch {
	// @ts-ignore
	skyblockStatsApiKey = SKYBLOCK_STATS_API_KEY
}
if (!skyblockStatsApiKey)
	console.warn('SKYBLOCK_STATS_API_KEY is not set as an environment variable. This is required for logging in with Discord to work. It should be the same as the `key` environment variable in skyblock-api.')

let discordClientId: string | undefined
try {
	discordClientId = process.env.DISCORD_CLIENT_ID
} catch {
	// @ts-ignore
	discordClientId = DISCORD_CLIENT_ID
}
if (!discordClientId)
	console.warn('DISCORD_CLIENT_ID is not set as an environment variable. This is required for logging in with Discord to work.')

export {
	skyblockStatsApiKey as SKYBLOCK_STATS_API_KEY,
	discordClientId as DISCORD_CLIENT_ID,
}
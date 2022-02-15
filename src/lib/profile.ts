import { constants } from './constants'
import { cleanId, millisecondsToTime } from './utils'

/**
 * Convert milliseconds since epoch into a string, but if it was within the
 * past week then show the timeago
 */
function prettyTimestamp(ms: number) {
    const isWithinPastWeek = Date.now() - ms < 1000 * 60 * 60 * 24 * 7
    const timeAsString = isWithinPastWeek ? (millisecondsToTime(Date.now() - ms) + ' ago') : (new Date(ms)).toUTCString()
    return timeAsString
}

export function generateMetaDescription(data) {
    const result: string[] = []

    result.push(`💾 Last save: ${prettyTimestamp(data.member.last_save * 1000)}`)

    result.push(`🚶 Profile created: ${prettyTimestamp(data.member.first_join * 1000)}`)

    result.push(`✨ Fairy souls: ${data.member.fairy_souls.total}/${constants.max_fairy_souls}`)

    if (data.profile.minion_count >= constants.max_minions)
        result.push(`🤖 Minion count: ${data.profile.minion_count}`)

    let mostSignificantKillsStat = null
    let mostSignificantDeathsStat = null

    for (const stat of data.member.stats) {
        if (
            stat.category === 'kills'
            && stat.rawName != 'kills'
            && stat.value >= 200_000
            && stat.value > (mostSignificantKillsStat?.value ?? 0)
        )
            mostSignificantKillsStat = stat
        if (
            stat.category === 'deaths'
            && stat.rawName != 'deaths'
            && stat.value > 1_000_000
            && stat.value > (mostSignificantDeathsStat?.value ?? 0)
        )
            mostSignificantDeathsStat = stat
    }

    if (mostSignificantKillsStat)
        result.push(
            `⚔️ ${mostSignificantKillsStat.value.toLocaleString()} ${mostSignificantKillsStat.unit || cleanId(mostSignificantKillsStat.rawName).toLowerCase()}`
        )

    if (mostSignificantDeathsStat)
        result.push(
            `☠ ${mostSignificantDeathsStat.value.toLocaleString()} ${mostSignificantDeathsStat.unit || cleanId(mostSignificantDeathsStat.rawName).toLowerCase()}`
        )

    return result.join('\n')
}
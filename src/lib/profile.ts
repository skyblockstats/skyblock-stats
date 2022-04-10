import type { CleanMemberProfile, StatItem } from './APITypes'
import { cleanId, millisecondsToTime } from './utils'

/**
 * Convert milliseconds since epoch into a string, but if it was within the
 * past week then show the timeago
 */
export function prettyTimestamp(ms: number) {
    const isWithinPastWeek = Date.now() - ms < 1000 * 60 * 60 * 24 * 7
    const timeAsString = isWithinPastWeek ? (millisecondsToTime(Date.now() - ms) + ' ago') : (new Date(ms)).toUTCString()
    return timeAsString
}

export const MODE_EMOJIS = {
    ironman: '♻️',
    stranded: '🏝️'
}
export const DEFAULT_MODE_EMOJI = '❓'

export function generateInfobox(data: CleanMemberProfile): string[] {
    const result: string[] = []

    if (data.member.left)
        result.push(`🚪 Removed from profile`)

    if (data.profile.mode !== 'normal') {
        const modeEmoji = MODE_EMOJIS[data.profile.mode] ?? DEFAULT_MODE_EMOJI
        result.push(`${modeEmoji} Mode: ${cleanId(data.profile.mode)}`)
    }

    if (data.member.lastSave)
        result.push(`💾 Last save: ${prettyTimestamp(data.member.lastSave)}`)

    if (data.member.firstJoin)
        result.push(`🚶 Profile created: ${prettyTimestamp(data.member.firstJoin)}`)

    result.push(`✨ Fairy souls: ${data.member.fairySouls.total}/${data.member.fairySouls.max}`)

    if (data.profile.minionCount >= data.profile.maxUniqueMinions)
        result.push(`🤖 Minion count: ${data.profile.minionCount}`)

    const farmingContestsWonByCrop: Record<string, number> = {}
    const farmingContestsWon = data.member.farmingContests.list.reduce(
        (previous, current) => {
            return previous + current.crops.reduce((previousCropSum, currentCrop) => {
                const wonContest = currentCrop.position === 1
                if (wonContest) {
                    farmingContestsWonByCrop[currentCrop.item] = (farmingContestsWonByCrop[currentCrop.item] ?? 0) + 1
                    return previousCropSum + 1
                }
                return previousCropSum
            }, 0)
        }, 0
    )

    if (farmingContestsWon >= 50) {
        let mostContestsWonCrop = ''
        let mostContestsWonCropCount = 0
        for (const [crop, count] of Object.entries(farmingContestsWonByCrop)) {
            if (count > mostContestsWonCropCount) {
                mostContestsWonCrop = crop
                mostContestsWonCropCount = count
            }
        }

        const cropEmoji = {
            cactus: '🌵',
            carrot: '🥕',
            cocoa_beans: '🍫',
            melon_slice: '🍉',
            // i couldn't find a better emoji lmao
            nether_wart: '🌶',
            potato: '🥔',
            pumpkin: '🎃',
            red_mushroom: '🍄',
            sugar_cane: '🎋',
            wheat: '🌾',
        }[mostContestsWonCrop] ?? '🌾'

        result.push(`${cropEmoji} Farming contests won: ${farmingContestsWon}`)
    }

    if (data.member.stats) {
        let mostSignificantKillsStat: StatItem | null = null
        let mostSignificantDeathsStat: StatItem | null = null

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
                `⚔ ${mostSignificantKillsStat.value.toLocaleString()} ${mostSignificantKillsStat.unit || cleanId(mostSignificantKillsStat.rawName).toLowerCase()}`
            )

        if (mostSignificantDeathsStat)
            result.push(
                `☠ ${mostSignificantDeathsStat.value.toLocaleString()} ${mostSignificantDeathsStat.unit || cleanId(mostSignificantDeathsStat.rawName).toLowerCase()}`
            )
    }

    return result
}

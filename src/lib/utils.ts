export const colorCodes: { [key: string]: string } = {
    '0': '#000000', // black
    '1': '#0000be', // blue
    '2': '#00be00', // green
    '3': '#00bebe', // cyan
    '4': '#be0000', // red
    '5': '#be00be', // magenta
    '6': '#ffaa00', // gold
    '7': '#bebebe', // light gray
    '8': '#3f3f3f', // dark gray
    '9': '#3f3ffe', // light blue
    'a': '#3ffe3f', // light green
    'b': '#3ffefe', // light cyan
    'c': '#fe3f3f', // light red
    'd': '#fe3ffe', // light magenta
    'e': '#fefe3f', // yellow
    'f': '#ffffff', // white
}

const specialCodes: { [key: string]: string } = {
    'l': 'font-weight: bold'
}

const colorCodeCharacter = '§'

export function formattingCodeToHtml(formatted: string): string {
    let htmlOutput = ''
    // we store the hex code, not the formatting code
    let currentColor: null | string = null
    // we store the css code, not the formatting code
    const activeSpecialCodes: string[] = []
    function reset() {
        if (currentColor) {
            htmlOutput += '</span>'
            currentColor = null
        }
        while (activeSpecialCodes.pop()) {
            htmlOutput += '</span>'
        }
    }
    while (formatted.length > 0) {
        const character = formatted[0]
        formatted = formatted.slice(1)
        // if it encounters § (or whatever colorCodeCharacter is), then read the next character
        if (character === colorCodeCharacter) {
            const colorCharacter = formatted[0]
            formatted = formatted.slice(1)
            if (colorCodes[colorCharacter]) {
                if (currentColor !== colorCodes[colorCharacter]) { // make sure the color is different than the active one
                    // if there's already a color, close that tag
                    if (currentColor) htmlOutput += '</span>'
                    currentColor = colorCodes[colorCharacter]
                    htmlOutput += `<span style="color:${currentColor}">`
                }
            } else if (specialCodes[colorCharacter]) {
                if (!activeSpecialCodes.includes(specialCodes[colorCharacter])) {
                    activeSpecialCodes.push(specialCodes[colorCharacter])
                    htmlOutput += `<span style="${specialCodes[colorCharacter]}">`
                }
            } else if (colorCharacter === 'r') {
                reset()
            }
        } else {
            // no xss!
            htmlOutput += character.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        }
    }
    reset()
    return htmlOutput
}

// we store the regex here so we don't have to build the object every time
const formattingCodeRegex = new RegExp(colorCodeCharacter + '.', 'g')
export function removeFormattingCode(formatted: string): string {
    return formatted.replace(formattingCodeRegex, '')
}

function moveToEndOfId(word: string, thing: string) {
    if (thing.startsWith(`${word}_`))
        thing = thing.slice(`${word}_`.length) + `_${word}`
    return thing
}

interface MillisecondsToTimeOpts {
    parts?: number
    /**
     * 0: All units
     * 1: Don't show milliseconds
     * 2: Don't show seconds
     * 3: Don't show minutes
     * 4: Don't show hours
     * 5: Don't show days
     */
    smallestUnit?: number
}

export function millisecondsToTime(totalMilliseconds: number, opts: MillisecondsToTimeOpts = {}) {
    if (totalMilliseconds < 0) {
        return 'Invalid time'
    }
    const totalSeconds = totalMilliseconds / 1000
    const totalMinutes = totalSeconds / 60
    const totalHours = totalMinutes / 60
    const totalDays = totalHours / 24
    const milliseconds = Math.floor(totalMilliseconds) % 1000

    const seconds = Math.floor(totalSeconds) % 60
    const minutes = Math.floor(totalMinutes) % 60
    const hours = Math.floor(totalHours) % 24
    const days = Math.floor(totalDays)

    const stringUnits: string[] = []

    const smallestUnit = opts.smallestUnit ?? 0

    if (totalDays > 1 && smallestUnit <= 4) stringUnits.push(days === 1 ? `${days} day` : `${days} days`)
    if (totalHours > 1 && smallestUnit <= 3) stringUnits.push(hours === 1 ? `${hours} hour` : `${hours} hours`)
    if (totalMinutes > 1 && smallestUnit <= 2) stringUnits.push(minutes === 1 ? `${minutes} minute` : `${minutes} minutes`)
    if (totalSeconds > 1 && smallestUnit <= 1) stringUnits.push(seconds === 1 ? `${seconds} second` : `${seconds} seconds`)
    if (totalMilliseconds > 0 && smallestUnit <= 0) stringUnits.push(`${milliseconds} ms`)

    // comma separated, "and" before last

    let partsCount = opts.parts ?? 2
    if (stringUnits.length < partsCount) partsCount = stringUnits.length
    if (partsCount === 1) return stringUnits[0]
    return stringUnits.slice(0, partsCount - 1).join(', ') + ' and ' + stringUnits[partsCount - 1]
}

export function cleanId(id: string) {
    for (const string of ['deaths', 'kills', 'collection', 'skill'])
        id = moveToEndOfId(string, id)

    return id
        .replace(/^./, id[0].toUpperCase())
        .replace(/_/g, ' ')
}

export function toTitleCase(s: string) {
    return s.replace(
        /\w\S*/g,
        w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    )
}

export function toRomanNumerals(number: number) {
    return ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'][number]
}

export function shuffle<T>(a: T[]): T[] {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g


export function twemojiHtml(s: string) {
    const htmlEncoded = s.replace('<', '&lt;').replace('>', '&gt;').replace('&', '&amp;')
    // replace unicode emojis with <img src="/emoji/[hex].svg">
    const asTwemoji = htmlEncoded.replace(emojiRegex, (match) => {
        return `<img src="/emoji/${[...match].map(p => p.codePointAt(0)!.toString(16)).join('-')}.svg" class="emoji" alt="${match}">`
    })
    return asTwemoji
}

export function formatNumber(n: number, digits = 3) {
    // from https://stackoverflow.com/a/9462382 with some modifications
    const numberSymbolsLookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ]
    const item = numberSymbolsLookup.slice().reverse().find(item => n >= item.value)
    return (n / (item?.value ?? 1)).toPrecision(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + (item?.symbol ?? '')
}

export function formatNumberFromUnit(n: number, unit: null | 'date' | 'time' | string) {
    switch (unit) {
        case null:
            return n.toLocaleString()
        case 'date':
            return (new Date(n * 1000)).toUTCString()
        case 'time':
            return millisecondsToTime(Math.abs(n))
        default:
            return `${n.toLocaleString()} ${unit}`
    }
}

/** Get the milliseconds since epoch for a given SkyBlock date. The year, month, and day are 1 indexed. */
export function skyblockTime(year: number, month = 1, day = 1) {
    const sbEpoch = 1560275700000
    let time = sbEpoch
    if (year) time += 446400000 * (year)
    if (month) time += 37200000 * (month - 1)
    if (day) time += 1200000 * (day - 1)
    return time
}
import vanillaDamages from 'skyblock-assets/data/vanilla_damages.json'
import * as skyblockAssets from 'skyblock-assets'

const itemToUrlCache: Record<string, string> = {}

interface Item {
    id?: string
    count?: number
    vanillaId: string

    display?: {
        name?: string
        lore?: string[]
        glint?: boolean
    }

    reforge?: string
    anvil_uses?: number
    timestamp?: string
    enchantments?: { [name: string]: number }

    head_texture?: string
}

const INVENTORIES = {
    armor: 'inv_armor',
    inventory: 'inv_contents',
    ender_chest: 'ender_chest_contents',
    talisman_bag: 'talisman_bag',
    potion_bag: 'potion_bag',
    fishing_bag: 'fishing_bag',
    quiver: 'quiver',
    trick_or_treat_bag: 'candy_inventory_contents',
    wardrobe: 'wardrobe_contents'
}

export type Inventories = { [name in keyof typeof INVENTORIES]: Item[] }

export async function itemToUrl(item: Item, packName?: string): Promise<string> {
    const stringifiedItem = (packName ?? 'packshq') + JSON.stringify(item)
    if (stringifiedItem in itemToUrlCache)
        return itemToUrlCache[stringifiedItem]
    const itemNbt: skyblockAssets.NBT = {
        display: {
            Name: item.display?.name
        },
        ExtraAttributes: {
            id: item.id,
        },
    }
    let textureUrl: string
    if (item.head_texture)
        textureUrl = `https://mc-heads.net/head/${item.head_texture}`
    else
        textureUrl = await skyblockAssets.getTextureUrl({
            id: item.vanillaId,
            nbt: itemNbt,
            pack: packName ?? 'packshq'
        })
    if (!textureUrl)
        console.log('no texture', item)
    itemToUrlCache[stringifiedItem] = textureUrl
    return textureUrl
}
export async function skyblockItemToUrl(skyblockItemName: string) {
    const item = skyblockItemNameToItem(skyblockItemName)
    const itemTextureUrl = await itemToUrl(item, 'packshq')
    return itemTextureUrl
}
export function skyblockItemNameToItem(skyblockItemName: string): Item {
    let item: Item
    if (Object.keys(skyblockItems).includes(skyblockItemName)) {
        item = skyblockItems[skyblockItemName]
    } else {
        item = {
            vanillaId: `minecraft:${skyblockItemName}`
        }
    }
    return item
}
const skyblockItems: { [itemName: string]: Item } = {
    ink_sac: { vanillaId: 'minecraft:dye' },
    cocoa_beans: { vanillaId: 'minecraft:dye:3' },
    lapis_lazuli: { vanillaId: 'minecraft:dye:4' },
    lily_pad: { vanillaId: 'minecraft:waterlily' },
    melon_slice: { vanillaId: 'minecraft:melon' },
    mithril_ore: {
        vanillaId: 'minecraft:prismarine_crystals',
        display: { name: 'Mithril Ore' }
    },
    acacia_log: { vanillaId: 'minecraft:log2' },
    birch_log: { vanillaId: 'minecraft:log:2' },
    cod: { vanillaId: 'minecraft:fish' },
    dark_oak_log: { vanillaId: 'minecraft:log2:1' },
    jungle_log: { vanillaId: 'minecraft:log:3' },
    oak_log: { vanillaId: 'minecraft:log' },
    pufferfish: { vanillaId: 'minecraft:fish:3' },
    salmon: { vanillaId: 'minecraft:fish:1' },
    spruce_log: { vanillaId: 'minecraft:log:1' },
    gemstone: {
        vanillaId: 'minecraft:skull',
        head_texture: '39b6e047d3b2bca85e8cc49e5480f9774d8a0eafe6dfa9559530590283715142'
    },
    hard_stone: { vanillaId: 'minecraft:stone' },
}

export function itemToUrlCached(item: Item, packName?: string): string {
    if (!item) return null
    if (typeof item === 'string') {
        let itemId: string = vanillaDamages[item] ?? item
        let damage: number = null
        // remove the minecraft: namespace since we already know it's all vanilla
        if (itemId.startsWith('minecraft:')) itemId = itemId.slice('minecraft:'.length)
        // split the damage into its own variable
        if (itemId.includes(':')) {
            damage = parseInt(itemId.split(':')[1])
            itemId = itemId.split(':')[0]
        }
        item = {
            count: 1,
            display: {
                glint: false,
                lore: null,
                name: null
            },
            id: null,
            // vanillaId: damage === null ? `minecraft:${itemId}` : `minecraft:${itemId}:${damage}`
            vanillaId: `minecraft:${itemId}`
        }
    }
    const stringifiedItem = (packName ?? 'packshq') + JSON.stringify(item)
    return itemToUrlCache[stringifiedItem]
}
/** Get all the items in an inventories object to cache them */
export async function cacheInventories(inventories: Inventories, packName?: string) {
    const promises: Promise<any>[] = []
    for (const inventoryItems of Object.values(inventories ?? {}))
        for (const inventoryItem of inventoryItems)
            if (inventoryItem)
                promises.push(itemToUrl(inventoryItem, packName))
    await Promise.all(promises)
}
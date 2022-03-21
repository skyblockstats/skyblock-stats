import * as skyblockAssets from 'skyblock-assets'
import { vanilla } from '$lib/packs'


export interface Item {
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

    headTexture?: string
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

export function itemToUrl(item: Item, pack?: skyblockAssets.MatcherFile): string {
    const itemNbt: skyblockAssets.NBT = {
        display: {
            Name: item.display?.name
        },
        ExtraAttributes: {
            id: item.id,
        },
    }
    let textureUrl: string
    if (item.headTexture) {
        // if it's a head, try without vanilla and if it fails just use the mc-heads url
        textureUrl = skyblockAssets.getTextureUrl({
            id: item.vanillaId,
            nbt: itemNbt,
            packs: pack ? [pack] : [],
            noNullTexture: true
        })
        if (textureUrl === null)
            textureUrl = `https://mc-heads.net/head/${item.headTexture}`
    } else
        textureUrl = skyblockAssets.getTextureUrl({
            id: item.vanillaId,
            nbt: itemNbt,
            packs: pack ? [pack, vanilla as skyblockAssets.MatcherFile] : [vanilla as skyblockAssets.MatcherFile],
        })
    return textureUrl
}

export function skyblockItemToUrl(skyblockItem: string | Item, pack?: skyblockAssets.MatcherFile) {
    const item: Item = typeof skyblockItem === 'string' ? skyblockItemNameToItem(skyblockItem) : skyblockItem
    const itemTextureUrl = itemToUrl(item, pack)
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
        headTexture: '39b6e047d3b2bca85e8cc49e5480f9774d8a0eafe6dfa9559530590283715142'
    },
    hard_stone: { vanillaId: 'minecraft:stone' },
}
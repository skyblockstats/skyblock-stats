export interface CleanMemberProfile {
	member: CleanMemberProfilePlayer
	profile: CleanFullProfileBasicMembers
	customization?: AccountCustomization
}

export interface CleanMemberProfilePlayer extends CleanPlayer {
	profileName: string
	first_join: number
	last_save: number
	bank?: Bank
	purse?: number
	stats?: StatItem[]
	rawHypixelStats?: {
		[key: string]: number
	}
	minions?: CleanMinion[]
	fairy_souls?: FairySouls
	inventories?: Inventories
	objectives?: Objective[]
	skills?: Skill[]
	visited_zones?: Zone[]
	collections?: Collection[]
	slayers?: SlayerData
}

export interface CleanBasicPlayer {
	uuid: string
	username: string
}

export interface CleanPlayer extends CleanBasicPlayer {
	rank: CleanRank
	socials: CleanSocialMedia
	profiles?: CleanBasicProfile[]
}

export interface StatItem {
	rawName: string
	value: number
	categorizedName: string
	category: string | null
	unit: string | null
}

interface Item {
	id: string
	count: number
	vanillaId: string
	display: {
		name: string
		lore: string[]
		glint: boolean
	}
	reforge?: string
	anvil_uses?: number
	timestamp?: string
	enchantments?: {
		[name: string]: number
	}
	head_texture?: string
}
export declare type Inventory = Item[]
export declare const INVENTORIES: {
	armor: string
	inventory: string
	ender_chest: string
	talisman_bag: string
	potion_bag: string
	fishing_bag: string
	quiver: string
	trick_or_treat_bag: string
	wardrobe: string
}
export declare type Inventories = {
	[name in keyof typeof INVENTORIES]: Item[]
}

export interface CleanUser {
	player: CleanPlayer | null
	profiles?: CleanProfile[]
	activeProfile?: string
	online?: boolean
	customization?: AccountCustomization
}

export interface CleanProfile extends CleanBasicProfile {
	members?: CleanBasicMember[]
}

/** A basic profile that only includes the profile uuid and name */
export interface CleanBasicProfile {
	uuid: string
	name?: string
}

export interface AccountCustomization {
	backgroundUrl?: string
	pack?: string
	emoji?: string
}

export interface CleanMinion {
	name: string
	levels: boolean[]
}

export interface CleanProfile extends CleanBasicProfile {
	members?: CleanBasicMember[]
}
export interface CleanFullProfile extends CleanProfile {
	members: CleanMember[]
	bank: Bank
	minions: CleanMinion[]
	minion_count: number
	maxUniqueMinions: number
}
export interface CleanFullProfileBasicMembers extends CleanProfile {
	members: CleanBasicMember[]
	bank: Bank
	minions: CleanMinion[]
	minion_count: number
	maxUniqueMinions: number
}

declare const COLLECTIONS: {
	readonly farming: readonly ["wheat", "carrot", "potato", "pumpkin", "melon_slice", "wheat_seeds", "red_mushroom", "cocoa_beans", "cactus", "sugar_cane", "feather", "leather", "porkchop", "chicken", "mutton", "rabbit", "nether_wart"]
	readonly mining: readonly ["cobblestone", "coal", "iron_ingot", "gold_ingot", "diamond", "lapis_lazuli", "emerald", "redstone", "quartz", "obsidian", "glowstone_dust", "gravel", "ice", "netherrack", "sand", "end_stone", "mithril_ore", "gemstone", "hard_stone"]
	readonly combat: readonly ["rotten_flesh", "bone", "string", "spider_eye", "gunpowder", "ender_pearl", "ghast_tear", "slime_ball", "blaze_rod", "magma_cream"]
	readonly foraging: readonly ["oak_log", "spruce_log", "birch_log", "jungle_log", "acacia_log", "dark_oak_log"]
	readonly fishing: readonly ["cod", "salmon", "tropical_fish", "pufferfish", "prismarine_shard", "prismarine_crystals", "clay_ball", "lily_pad", "ink_sac", "sponge"]
	readonly unknown: readonly []
}
declare type CollectionCategory = keyof typeof COLLECTIONS
export interface Collection {
	name: string
	xp: number
	level: number
	category: CollectionCategory
}

export interface MayorPerk {
	name: string
	description: string
}

export interface Candidate {
	name: string
	perks: MayorPerk[]
	votes: number
	color: string | null
}

export interface ElectionData {
	last_updated: number
	previous: {
		year: number
		winner: string
		candidates: Candidate[]
	}
	current: {
		year: number
		candidates: Candidate[]
	} | null
}

interface SessionSchema {
	_id?: string
	refresh_token: string
	discord_user: {
		id: string
		name: string
	}
	lastUpdated: Date
}

export interface AccountCustomization {
	backgroundUrl?: string
	pack?: string
	emoji?: string
}

export interface AccountSchema {
	_id?: string
	discordId: string
	minecraftUuid?: string
	customization?: AccountCustomization
}

export interface CleanSocialMedia {
	discord: string | null
	forums: string | null
}

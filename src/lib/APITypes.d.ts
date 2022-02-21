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

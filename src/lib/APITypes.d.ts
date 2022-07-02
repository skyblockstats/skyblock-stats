import type typedHypixelApi from 'typed-hypixel-api'


export interface CleanMemberProfile {
	member: CleanMemberProfilePlayer
	profile: CleanFullProfileBasicMembers
	customization?: AccountCustomization
}

export interface CleanMemberProfilePlayer extends CleanPlayer {
	profileName: string
	firstJoin: number | null
	lastSave: number | null
	purse: number
	stats: StatItem[]
	rawHypixelStats: { [key: string]: number }
	minions: CleanMinion[]
	fairySouls: FairySouls
	inventories?: Inventories
	objectives: Objective[]
	skills: Skills
	zones: Zone[]
	collections: Collection[]
	slayers: SlayerData
	pets: PetsData
	harp: HarpData
	coopInvitation: CoopInvitation | null
	farmingContests: FarmingContests
	accessoryBagUpgrades: AccessoryBagUpgrades
	essence: Essence
	left: boolean
}

export interface CleanMember extends CleanBasicMember {
	purse: number
	stats: StatItem[]
	rawHypixelStats: {
		[key: string]: number
	}
	minions: CleanMinion[]
	fairySouls: FairySouls
	inventories?: Inventories
	objectives: Objective[]
	skills: Skills
	zones: Zone[]
	collections: Collection[]
	slayers: SlayerData
	/** Whether the user left the coop */
	left: boolean
}


export interface CleanBasicPlayer {
	uuid: string
	username: string
}

export interface CleanPlayer extends CleanBasicPlayer {
	rank: CleanRank
	socials: CleanSocialMedia
	profiles?: CleanBasicProfile[]
	claimed?: ClaimedSkyBlockItem[]
	achievements?: Achievements
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
	anvilUses?: number
	timestamp?: string
	enchantments?: {
		[name: string]: number
	}
	headTexture?: string
}
export declare type Inventory = Item[]
export declare const INVENTORIES: {
	armor: string
	inventory: string
	ender_chest: string
	accessory_bag: string
	potion_bag: string
	fishing_bag: string
	quiver: string
	trick_or_treat_bag: string
	wardrobe: string,
	personal_vault: string
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
	members: CleanBasicMember[]
	mode: GameMode
}

/** A basic profile that only includes the profile uuid and name */
export interface CleanBasicProfile {
	uuid: string
	name?: string
}

export interface AccountCustomization {
	backgroundUrl?: string
	pack?: string
	blurBackground?: boolean
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
	minionCount: number
	maxUniqueMinions: number
}
export interface CleanFullProfileBasicMembers extends CleanProfile {
	members: CleanBasicMember[]
	bank: Bank
	minions: CleanMinion[]
	minionCount: number
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
	amount: number
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
	lastUpdated: number
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

export interface SlayerData {
	xp: number
	kills: number
	bosses: Slayer[]
}

interface SlayerTier {
	tier: number
	kills: number
}

export interface Slayer {
	name?: SlayerName
	rawName: string
	xp: number
	level: number
	kills: number
	tiers: SlayerTier[]
}

export interface CleanBasicMember {
	uuid: string
	username: string
	lastSave: number
	firstJoin: number
	rank: CleanRank
	left?: boolean
}

export interface Bank {
	balance?: number
	history: BankHistoryItem[]
}
export interface BankHistoryItem {
	change: number
	total: number
	timestamp: number
	name: string
}


export interface HarpSong {
	id: string
	/** A number between 0 and 1 representing the user's best completion */
	progress: number
	completions: number
	perfectCompletions: number
}

export interface HarpData {
	selected: {
		id: string
		timestamp: number
	} | null
	claimedMelodysHair: boolean
	songs: HarpSong[]
}

export interface ClaimedSkyBlockItem {
	name: string
	id: string
	timestamp: number
}

export interface Pet {
	id: string
	xp: number
	level: number
	tier: typedHypixelApi.Pet['tier']
	skin: string | null
	item: ItemListItem | null
}
export interface PetsData {
	active: Pet | null
	list: Pet[]
	missingIds: string[]
}

export interface ItemRequirement {
	dungeon?: {
		type: string
		level: number
	}
	skill?: {
		type: string
		level: number
	}
	slayer?: {
		boss: string
		level: number
	}
}

export interface ItemListItem {
	id: string
	headTexture?: string
	vanillaId: string
	tier: string | null
	display: {
		name: string
		glint: boolean
	}
	npcSellPrice: number | null
	requirements: ItemRequirement
	category: string | null
	soulbound: boolean
	museum: boolean
}

export interface ItemListData {
	lastUpdated: number
	list: ItemListItem[]
}

export interface PlayerFarmingContestStats {
	year: number
	month: number
	day: number
	crops: {
		item: string
		amount: number
		/** The position (1-indexed) that the user got on the contest. */
		position: number | null
		/** Whether the player has claimed their rewards. */
		claimed: boolean | null
		/**
		 * The number of people who participated in this contest.
		 */
		participants: number | null
	}[]
}
export interface FarmingContests {
	talkedToJacob: boolean
	list: PlayerFarmingContestStats[]
}

export interface CoopInvitation {
	invitedTimestamp: number
	invitedBy: CleanPlayer | null
	accepted: boolean
	acceptedTimestamp: number | null
}

export type GameMode = 'normal' | 'stranded' | 'bingo' | 'ironman'

export interface MemberLeaderboard {
	name: string
	unit: string | null
	list: MemberLeaderboardItem[]
	info?: string
}

export interface ProfileLeaderboard {
	name: string
	unit: string | null
	list: ProfileLeaderboardItem[]
	info?: string
}

export interface MemberLeaderboardItem {
	player: LeaderboardBasicPlayer
	profileUuid: string
	value: number
}
export interface ProfileLeaderboardItem {
	players: LeaderboardBasicPlayer[]
	profileUuid: string
	value: number
}

export interface LeaderboardBasicPlayer {
	uuid: string
	username: string
	rank: {
		color: string
	}
}


export interface Skill {
	id: string
	xp: number
	level: number

	maxLevel: number

	levelXp: number
	levelXpRequired: number
}

export interface Skills {
	list: Skill[]
	/**
	 * Whether the player has their skills API enabled. If this is off, that
	 * means the data doesn't include xp and is per-player. You should show a
	 * warning to the user.
	 */
	apiEnabled: boolean
	average: number
}


export interface AccessoryBagUpgrades {
	tuningTemplates: Record<string, number>[]
	upgrades: {
		purchased: number
		coinsSpent: number
		extraSlots: number
	}
	powers: {
		selected: string | null
		list: string[]
	}
}

export interface SimpleAuctionSchema {
	/** The UUID of the auction so we can look it up later. */
	id: string
	coins: number
	/**
	 * The timestamp as **seconds** since epoch. It's in seconds instead of ms
	 * since we don't need to be super exact and so it's shorter.
	 */
	ts: number
	/** Whether the auction was bought or simply expired. */
	success: boolean
	bin: boolean
}
export interface ItemAuctionsSchema {
	/** The id of the item */
	id: string
	sbId: string
	auctions: SimpleAuctionSchema[]
}

interface TieredAchievement {
	id: string
	name: string
	tier: number
	amount: number
	/**
	 * The amount that has to be gotten to get to the next tier. If this is
	 * null, that means the player is at the max tier.
	 */
	next: number | null
	description: string
}

interface ChallengeAchievement {
	id: string
	name: string
	unlocked: boolean
	description: string
}

export interface Achievements {
	tiered: TieredAchievement[]
	challenge: ChallengeAchievement[]
}

interface EssenceType {
	id: string
	amount: number
}

export interface Essence {
	types: EssenceType[]
}

export interface Auction {
	id: string
	sellerUuid: string
	sellerProfileUuid: string
	buyer: CleanPlayer | null
	creationTimestamp: number
	boughtTimestamp: number
	coins: number
	bin: boolean
	item: Item
}

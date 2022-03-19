import type { MatcherFile } from 'skyblock-assets'
export { default as vanilla } from 'skyblock-assets/matchers/vanilla.json'

export const PACK_NAMES = {
	'ectoplasm': 'Ectoplasm',
	'furfsky': 'Furfsky',
	'furfsky_reborn': 'Furfsky Reborn',
	'hypixel+': 'Hypixel+',
	'packshq': 'PacksHQ',
	'rnbw': 'RNBW',
	'vanilla': 'Vanilla',
	'worlds_and_beyond': 'Worlds and Beyond',
}

export async function loadPack(name?: keyof typeof PACK_NAMES | string): Promise<MatcherFile> {
	switch (name) {
		case 'ectoplasm':
			return await import('skyblock-assets/matchers/ectoplasm.json') as any
		case 'furfsky':
			return await import('skyblock-assets/matchers/furfsky.json') as any
		case 'furfsky_reborn':
			return await import('skyblock-assets/matchers/furfsky_reborn.json') as any
		case 'hypixel+':
			return await import('skyblock-assets/matchers/hypixel+.json') as any
		case 'packshq':
			return await import('skyblock-assets/matchers/packshq.json') as any
		case 'rnbw':
			return await import('skyblock-assets/matchers/rnbw.json') as any
		case 'vanilla':
			return await import('skyblock-assets/matchers/vanilla.json') as any
		case 'worlds_and_beyond':
			return await import('skyblock-assets/matchers/worlds_and_beyond.json') as any
	}
	// if we can't find the pack, just return furfsky reborn
	return await loadPack('furfsky_reborn')
}
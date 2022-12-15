import type { PageData } from './$types'
import { fetchApi } from '$lib/api'

export const load = (async ({ fetch }) => {
	const auctionItemsPromise = fetchApi(`auctionitems`, fetch).then(r => r.json())
	const prices = await fetchApi(`auctionprices`, fetch).then(r => r.json())
	const items = await auctionItemsPromise

	return {
		prices,
		items,
	}
}) satisfies PageData

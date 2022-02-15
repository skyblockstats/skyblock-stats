import { API_URL } from '$lib/api'

export let constants: any = {}

async function updateConstants() {
    constants = await fetch(API_URL + 'constants').then(r => r.json())
    console.log('updated constants')
}

updateConstants()
setInterval(updateConstants, 60 * 60 * 1000) // update every hour
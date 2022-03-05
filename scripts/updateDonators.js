import fs from 'fs'
import https from 'https'

const API_URL = 'https://skyblock-api.matdoes.dev/'

function fetch(url) {
	return new Promise((resolve, reject) => {
		let data = ''

		const req = https.request(new URL(url), res => {
			res.on('data', d => {
				data += d
			})

			res.on('end', () => {
				resolve(data)
			})
		})

		req.on('error', error => {
			reject(error)
		})

		req.end()
	})
}
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
			;[a[i], a[j]] = [a[j], a[i]]
	}
	return a
}

// create a donators.json from the donators.txt
const donatorUuidsText = await fs.promises.readFile('src/donators.txt', {
	encoding: 'utf8'
})
const donatorUuids = donatorUuidsText.split('\n').map(u => u.split(' ')[0]).filter(u => u)
const donators = await Promise.all(
	donatorUuids.map(u => fetch(`${API_URL}player/${u}`)
		.then(r => JSON.parse(r).player)
	)
)
await fs.promises.writeFile(
	'src/_donators.json',
	JSON.stringify(shuffle(donators)),
	{ encoding: 'utf8' }
)

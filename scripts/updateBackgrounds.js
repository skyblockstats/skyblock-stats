import { promises as fs } from 'fs'
import sharp from 'sharp'
import { cpus } from 'os'

// read the file names in the backgrounds folder
const backgrounds = await fs.readdir('static/backgrounds')
// sort by natural order
backgrounds.sort((a, b) => a.localeCompare(b, 'en', { numeric: true, ignorePunctuation: true }))

await fs.writeFile(
	'src/_backgrounds.json',
	JSON.stringify(backgrounds),
	{ encoding: 'utf8' }
)

// resize the backgrounds

async function resizeBackground(name) {
	const rawEncodedImage = await sharp(`static/backgrounds/${name}`)
		.rotate()
		.resize(512)
		.jpeg({ mozjpeg: true, quality: 30 })
		.toBuffer()

	await fs.writeFile(`static/backgrounds-small/${name}`, rawEncodedImage)
}

try {
	await fs.rm('static/backgrounds-small', { recursive: true })
} catch {
	// it errors if the directory already doesn't exist
}
await fs.mkdir('static/backgrounds-small', { recursive: true })

await Promise.all(backgrounds.map(b => resizeBackground(b)))

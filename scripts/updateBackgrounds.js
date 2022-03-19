import { promises as fs } from 'fs'
import { ImagePool } from '@squoosh/lib'
import { cpus } from 'os'

const imagePool = new ImagePool(cpus().length)

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
	const file = await fs.readFile(`static/backgrounds/${name}`)
	const image = imagePool.ingestImage(file)

	const preprocessOptions = {
		resize: {
			width: 512,
		},
	}
	await image.preprocess(preprocessOptions)

	await image.encode({
		mozjpeg: {
			quality: 30,
		},
	})

	const rawEncodedImage = await image.encodedWith.mozjpeg

	await fs.writeFile(`static/backgrounds-small/${name}`, rawEncodedImage.binary)
}

try {
	await fs.rm('static/backgrounds-small', { recursive: true })
} catch {
	// it errors if the directory already doesn't exist
}
await fs.mkdir('static/backgrounds-small', { recursive: true })

await Promise.all(backgrounds.map(b => resizeBackground(b)))
await imagePool.close()

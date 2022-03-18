import fs from 'fs'

// read the file names in the backgrounds folder
const backgrounds = fs.readdirSync('static/backgrounds')

await fs.promises.writeFile(
	'src/_backgrounds.json',
	JSON.stringify(backgrounds),
	{ encoding: 'utf8' }
)

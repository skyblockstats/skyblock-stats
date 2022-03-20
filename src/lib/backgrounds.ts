// a hand picked list of backgrounds that i think look pretty good on the user profile
const coolBackgrounds = [
	'4.jpg',
	'5.jpg',
	'7.jpg',
	'8.jpg',
	'11.jpg',
	'12.jpg',
	'15.jpg',
	'22.jpg',
	'27.jpg',
	'35.jpg',
	'38.jpg',
	'43.jpg',
	'45.jpg',
	'49.jpg',
	'63.jpg',
	'65.jpg',
	'66.jpg',
	'67.jpg',
	'68.jpg',
	'69.jpg',
	'70.jpg',
	'71.jpg',
]

/**
 * Choose a background for the user based on their UUID.
 * @param uuid The dashed or undashed UUID of the user.
 * @returns The URL of the chosen background.
 */
export function chooseDefaultBackground(uuid: string): string {
	// choose a background based on the user's uuid
	const uuidNumber = parseInt(uuid.replace(/[^0-9]/g, ''), 16)
	return '/backgrounds/' + coolBackgrounds[uuidNumber % coolBackgrounds.length]
}

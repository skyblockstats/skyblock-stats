import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { minifyHtml } from 'vite-plugin-html'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		// https://vitejs.dev/config/
		vite: {
			plugins: [minifyHtml()],
			build: {
				rollupOptions: {
					external: ['discord-api-types/payloads/v9', 'discord-api-types', 'discord-api-types/v9'],
					output: {
						manualChunks: undefined,
					},
				},
			},
		},
	}
};

export default config;

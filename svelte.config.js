// import adapter from '@sveltejs/adapter-static'
// import adapter from '@sveltejs/adapter-node'
import adapter from '@sveltejs/adapter-auto'
// import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
// import { createHtmlPlugin } from 'vite-plugin-html'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	compilerOptions: {
		preserveWhitespace: false
	},

	kit: {
		adapter: adapter(),
		// adapter: adapter({
		// 	out: 'build',
		// 	precompress: true,
		// 	env: {
		// 		host: '127.0.0.1'
		// 	}
		// }),
		

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ['PATCH', 'DELETE']
		},

		// https://vitejs.dev/config/
		vite: {
		// 	plugins: [createHtmlPlugin({
		// 		minify: true
		// 	})],
			build: {
				rollupOptions: {
					// external: ['discord-api-types/payloads/v9', 'discord-api-types', 'discord-api-types/v9'],
					output: {
						manualChunks: undefined,
					},
				},
			},
		},
	}
};

export default config;

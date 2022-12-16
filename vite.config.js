import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined,
			},
		},
	},
	// if the user is on replit or gitpod, use a secure websocket
	server:
		process.env.REPL_ID || process.env.GITPOD_WORKSPACE_ID
			? {
				hmr: process.env.GITPOD_WORKSPACE_URL
					? {
						host: process.env.GITPOD_WORKSPACE_URL.replace('https://', '3000-'),
						protocol: "wss",
						clientPort: 443
					}
					: true
			}
			: {},
}

export default config
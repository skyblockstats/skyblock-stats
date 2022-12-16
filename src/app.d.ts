/// <reference types="@sveltejs/kit" />

// // See https://kit.svelte.dev/docs/typescript
// // for information about these interfaces
declare namespace App {
	// interface Error { }

	interface Locals {
		sid: string | undefined
	}

	// interface PageData { }

	interface Platform {
		env: {
			DISCORD_CLIENT_ID: string | undefined
			SKYBLOCK_STATS_API_KEY: string | undefined
		}
		context: {
			waitUntil(promise: Promise<any>): void
		}
	}

}

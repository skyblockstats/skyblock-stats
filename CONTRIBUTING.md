# Contributing

If you'd like to contribute to SkyBlock Stats, I highly encourage you to join [the Discord server](https://discord.gg/KtscNUnh4f).

If you want to add yourself as an admin for testing, add your undashed Minecraft UUID to `src/_admins.json`.
If you change the backgrounds or donators list, run "yarn run init" to update the files.

# Development

(steps 1 and 2 are only required if you want to change the backend too)

1. Install and run [skyblock-api](https://github.com/skyblockstats/skyblock-api)
2. Change the `API_URL` in `src/lib/api.ts` to `localhost:8080`.
3. Run `yarn` to install dependencies
4. `yarn run init`
5. `yarn dev`

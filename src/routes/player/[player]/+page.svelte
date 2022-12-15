<script lang="ts">
	import type { CleanPlayer, CleanProfile, CleanUser } from '$lib/APITypes'
	import BackgroundImage from '$lib/BackgroundImage.svelte'
	import Username from '$lib/minecraft/Username.svelte'
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'
	import { chooseDefaultBackground } from '$lib/backgrounds'
	import Emoji from '$lib/Emoji.svelte'
	import { MODE_EMOJIS, DEFAULT_MODE_EMOJI } from '$lib/profile'
	import Tooltip from '$lib/Tooltip.svelte'
	import { cleanId } from '$lib/utils'
	import type { PageData } from './$types'

	export let data: PageData

	let activeProfile: CleanProfile | null = null
	let activeProfileLastSave: number = 0
	let isActiveProfileOnline: boolean

	function updateActiveProfile() {
		activeProfileLastSave = 0
		if (data.profiles)
			for (const profile of data.profiles) {
				if (profile.members)
					for (const member of profile.members) {
						if (member.uuid === data.player?.uuid && member.lastSave > activeProfileLastSave) {
							activeProfile = profile
							activeProfileLastSave = member.lastSave
						}
					}
			}

		isActiveProfileOnline = Date.now() - 60 < activeProfileLastSave
	}

	let backgroundUrl: string | null

	$: {
		data
		backgroundUrl = data.customization?.backgroundUrl ?? chooseDefaultBackground(data.player.uuid)
		updateActiveProfile()
	}
</script>

{#if backgroundUrl}
	<BackgroundImage url={backgroundUrl} />
{/if}

<Head title={data.player ? `${data.player.username}'s SkyBlock profiles` : 'Invalid player'} />
<Header />

<main>
	<h1>
		<Username player={data.player} headType="3d" />'s profiles
	</h1>

	{#if data.profiles && data.profiles.length > 0}
		<ul class="profile-list">
			{#each data.profiles ?? [] as profile}
				<li
					class="profile-list-item"
					class:profile-list-item-active={profile.uuid === activeProfile?.uuid}
					class:profile-list-item-online={profile.uuid === activeProfile?.uuid &&
						isActiveProfileOnline}
				>
					<a
						class="profile-name"
						href="/player/{data.player?.username}/{profile.name}"
						data-sveltekit-preload-data="hover"
					>
						{profile.name}
					</a>
					{#if profile.mode !== 'normal'}
						<Tooltip>
							<span slot="tooltip">
								{cleanId(profile.mode)} mode
							</span>
							<Emoji value={MODE_EMOJIS[profile.mode] ?? DEFAULT_MODE_EMOJI} />
						</Tooltip>
					{/if}
					<span class="profile-members">
						{#if (profile.members?.length ?? 0) > 1}
							{#each profile.members?.filter(m => !m.left) ?? [] as player}
								<span class="member">
									<Username
										{player}
										headType="2d"
										hyperlinkToProfile={player.uuid != data.player?.uuid}
									/>
								</span>
							{/each}
							{#each profile.members?.filter(m => m.left) ?? [] as player}
								<span class="member">
									<Username {player} headType="2d" hyperlinkToProfile={profile.uuid} disabled />
								</span>
							{/each}
						{:else}
							Solo
						{/if}
					</span>
				</li>
			{/each}
		</ul>
	{:else}
		<p>This player has no profiles. <Emoji value="😦" /></p>
	{/if}
</main>

<style>
	.profile-members {
		margin-left: 0.5em;
		color: var(--theme-main-text);
	}
	.profile-members > .member {
		margin-right: 0.35em;
	}

	.profile-list {
		font-size: 1.5em;
		display: inline-flex;
		flex-wrap: wrap;
	}

	.profile-list-item {
		margin-bottom: 0.5em;
		color: var(--theme-darker-text);
		width: 100%;
	}
	.profile-list-item-active {
		color: #fff;
	}
	.profile-list-item-online {
		color: #0e0;
	}
</style>

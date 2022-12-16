<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Emoji from '$lib/Emoji.svelte'
	import ListItemWithIcon from '$lib/ListItemWithIcon.svelte'
	import { skyblockItemToUrl } from '$lib/minecraft/inventory'
	import { skyblockTime } from '$lib/utils'

	export let data: CleanMemberProfile

	let cachedItemUrls: Record<string, string> = {}
	function cachedSkyblockItemToUrl(item: string) {
		if (!cachedItemUrls[item]) cachedItemUrls[item] = skyblockItemToUrl(item)
		return cachedItemUrls[item]
	}
</script>

<div class="info-text primary-info-text">
	<p>Talked to Jacob: <Emoji value={data.member.farmingContests.talkedToJacob ? '✅' : '❌'} /></p>
</div>
<div class="farming-contests-list">
	{#each data.member.farmingContests.list as farmingContest}
		<div class="farming-contest">
			<p class="farming-contest-date">
				{new Date(
					skyblockTime(farmingContest.year, farmingContest.month, farmingContest.day)
				).toUTCString()}
			</p>
			<ul>
				{#each farmingContest.crops as crop}
					<ListItemWithIcon src={cachedSkyblockItemToUrl(crop.item)}>
						<b>{crop.amount.toLocaleString()}</b> collected
						{#if crop.position}
							<span class="farming-contest-item-placement">
								(#{crop.position}/{crop.participants})
							</span>
						{/if}
					</ListItemWithIcon>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	p,
	ul {
		margin: 0;
	}

	.primary-info-text {
		margin: 0.5em 0;
	}

	.info-text {
		color: var(--theme-darker-text);
	}

	.farming-contest-item-placement,
	.farming-contest-date {
		color: var(--theme-darker-text);
	}
</style>

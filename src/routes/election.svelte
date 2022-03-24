<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'
	import { API_URL } from '$lib/api'

	export const load: Load = async ({ params, fetch }) => {
		const data = await fetch(`${API_URL}election?t=${Math.floor(Date.now() / 1000)}`).then(r =>
			r.json()
		)

		return {
			props: {
				data,
			},
		}
	}
</script>

<script lang="ts">
	import Header from '$lib/Header.svelte'
	import Head from '$lib/Head.svelte'
	import { colorCodes, formattingCodeToHtml, millisecondsToTime, skyblockTime } from '$lib/utils'
	import type { ElectionData } from '$lib/APITypes'
	import { onDestroy, onMount } from 'svelte'
	import MayorSkin from '$lib/MayorSkin.svelte'
	import { invalidate } from '$app/navigation'
	import { browser } from '$app/env'

	export let data: ElectionData

	let destroyed = false

	let currentTime = Date.now()
	// update currentTime every animation frame
	function updateTime() {
		currentTime = Date.now()
		if (!destroyed) requestAnimationFrame(updateTime)
	}

	$: nextSpecialMayorYear = Math.ceil(((data.current?.year || data.previous.year) + 1) / 8) * 8
	const specialMayors = ['Scorpius', 'Derpy', 'Jerry']

	let autoInvalidateTimeout: null | NodeJS.Timeout = null

	// invalidate at the end of every minute
	async function autoInvalidate(first: boolean) {
		// don't invalidate the first time the function is called
		if (!first) await invalidate('')

		const lastUpdatedAgo = Date.now() - data.lastUpdated
		autoInvalidateTimeout = setTimeout(() => autoInvalidate(false), lastUpdatedAgo + 10 * 60 * 1000)
	}

	if (browser) autoInvalidate(true)

	onMount(() => {
		destroyed = false
		updateTime()
	})

	onDestroy(() => {
		destroyed = true
		if (autoInvalidateTimeout) clearTimeout(autoInvalidateTimeout)
	})
</script>

<Head title="SkyBlock Mayor Election Status" />
<Header />

<main>
	{#if data.current}
		<div class="next-mayor-update">
			<p>
				<b>Last API update:</b>
				{millisecondsToTime(currentTime - data.lastUpdated, {
					smallestUnit: 1,
					parts: 1,
				})} ago
			</p>
			<p>
				<b>Next API update:</b>
				{millisecondsToTime(10 * 60 * 1000 - (currentTime - data.lastUpdated), {
					smallestUnit: 1,
					parts: 1,
				})}
			</p>
		</div>
	{/if}
	<h1>SkyBlock Mayor Election Status</h1>
	<p>
		<b>Next election:</b>
		{millisecondsToTime(skyblockTime(data.previous.year + 1, 6, 27) - currentTime, {
			parts: 3,
			smallestUnit: 1,
		})}
	</p>

	{#if data.current}
		<h2>Ongoing election <span class="candidate-year">(Year {data.current.year})</span></h2>
		<p class="election-ends-in-text">
			<b>Ends in:</b>
			{millisecondsToTime(skyblockTime(data.previous.year + 1, 3, 27) - currentTime)}
		</p>
		<div class="mayor-candidates">
			{#each data.current.candidates.sort((a, b) => a.votes - b.votes) as candidate}
				{@const color = candidate.color ? colorCodes[candidate.color] : null}
				<div class="mayor">
					<div>
						<h3 style={color ? `color: ${color}` : undefined}>{candidate.name}</h3>
						<p class="mayor-vote-count">
							<span class="mayor-vote-count-number" style={color ? `color: ${color}` : undefined}>
								{candidate.votes.toLocaleString()}
							</span> votes
						</p>
						<MayorSkin name={candidate.name} />
					</div>
					<ul class="mayor-perks">
						{#each candidate.perks as perk}
							<div class="mayor-perk">
								<h4 style={color ? `color: ${color}` : undefined}>{perk.name}</h4>
								<p>{@html formattingCodeToHtml(perk.description)}</p>
							</div>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	{/if}

	<h2>
		Previous election <span class="candidate-year">(Year {data.previous.year})</span>
	</h2>
	<div class="mayor-candidates">
		{#each data.previous.candidates.sort((a, b) => b.votes - a.votes) as candidate}
			{@const color = candidate.color ? colorCodes[candidate.color] : null}
			<div class="mayor">
				<div>
					<h3 style={color ? `color: ${color}` : undefined}>{candidate.name}</h3>
					<p class="mayor-vote-count">
						<span class="mayor-vote-count-number" style={color ? `color: ${color}` : undefined}>
							{candidate.votes.toLocaleString()}
						</span> votes
					</p>
					{#if candidate.name == data.previous.winner}
						<p class="mayor-winner">Winner</p>
					{/if}
					<MayorSkin name={candidate.name} />
				</div>
				<ul class="mayor-perks">
					{#each candidate.perks as perk}
						<div class="mayor-perk">
							<h4 style={color ? `color: ${color}` : undefined}>{perk.name}</h4>
							<p>{@html formattingCodeToHtml(perk.description)}</p>
						</div>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<!-- {%- set nextSpecialMayorYear = (((data.current.year or data.previous.year) + 1) / 8)|round(0, 'ceil') * 8 -%}
	{%- set specialMayors = ['Scorpius', 'Derpy', 'Jerry'] -%}
	<h2>Upcoming special mayors</h2>
	<ul>
		{%- for i in range(3) -%}
		<li><b>{{ specialMayors[((nextSpecialMayorYear / 8) + i) % 3] }}</b> <span class="next-special-mayor-time">({{ skyblockYear(nextSpecialMayorYear + 8 * i, 6, 27) }})</span></li>
		{%- endfor -%}
	</ul> -->

	<h2>Upcoming special mayors</h2>
	<ul>
		<!-- for i in range(3) -->
		{#each Array(3) as _, i}
			<li>
				<b>{specialMayors[(nextSpecialMayorYear / 8 + i) % 3]}</b>
				<span class="next-special-mayor-time">
					({millisecondsToTime(
						skyblockTime(nextSpecialMayorYear + 8 * i + 1, 3, 27) - currentTime
					)})
				</span>
			</li>
		{/each}
	</ul>
</main>

<style>
	.mayor-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-column-gap: 1em;
		grid-row-gap: 1em;
		margin-top: 1em;
		margin-bottom: 1em;
	}
	.mayor {
		display: inline-block;
		width: 12em;
		margin-right: 1em;
		vertical-align: top;
	}
	.mayor h3 {
		filter: brightness(1.5);
		text-align: center;
	}
	.mayor img {
		display: block;
		width: 5em;
		margin: 0 auto;
	}
	.mayor-vote-count-number {
		filter: brightness(1.2);
	}
	.mayor-vote-count {
		text-align: center;
		width: 100%;
		margin: 0 0 0.5em 0;
	}
	.mayor-perk h4 {
		margin-bottom: 0;
	}
	.mayor-perk p {
		margin: 0;
	}
	.mayor-candidates {
		/* display: ; */
		/* everything next to each other */
		/* grid-template-columns: repeat(5, 1fr); */
		max-width: fit-content;
	}
	.mayor-perks {
		list-style-type: none;
		padding: 0;
	}
	.candidate-year {
		font-weight: normal;
		color: var(--theme-darker-text);
	}
	.mayor-winner {
		color: var(--theme-yellow);
		font-weight: bold;
		margin: 0;
		text-align: center;
		font-size: 1em;
	}
	.next-special-mayor-time {
		color: var(--theme-darker-text);
	}
	.election-ends-in-text {
		margin-top: 0;
	}
	.next-mayor-update {
		float: right;
		color: var(--theme-darker-text);
	}
	.next-mayor-update p {
		margin: 0;
	}
</style>

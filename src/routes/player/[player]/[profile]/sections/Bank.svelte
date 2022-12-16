<script lang="ts">
	import type { CleanMemberProfile } from '$lib/APITypes'
	import Tooltip from '$lib/Tooltip.svelte'
	import ConditionalLink from '$lib/ConditionalLink.svelte'
	import {
		colorCodeCharacter,
		formattingCodeToHtml,
		millisecondsToTime,
		removeFormattingCode,
	} from '$lib/utils'

	export let data: CleanMemberProfile
</script>

{#if data.profile.bank}
	<div class="bank-main-current-balance">
		<p>
			Current bank balance:
			<span class="bank-main-current-balance-value">
				<b>{data.profile.bank.balance?.toLocaleString()}</b> coins
			</span>
		</p>
		<p>
			Purse:
			<span class="bank-main-current-balance-value">
				<b>{data.member.purse.toLocaleString()}</b> coins
			</span>
		</p>
	</div>
	{#each data.profile.bank.history as transaction}
		<div>
			<span class="transaction-player">
				<ConditionalLink
					href="/player/{removeFormattingCode(transaction.name)}"
					isWrapped={transaction.name.startsWith(colorCodeCharacter)}
				>
					{@html formattingCodeToHtml(transaction.name)}
				</ConditionalLink>
			</span>
			<Tooltip>
				<span slot="tooltip">
					New balance: <b>{transaction.total.toLocaleString()}</b>
				</span>
				<span
					class:difference-positive={transaction.change > 0}
					class:difference-negative={transaction.change < 0}
				>
					{transaction.change > 0
						? '+' + transaction.change.toLocaleString()
						: transaction.change.toLocaleString()}
				</span>
			</Tooltip>

			<span class="transaction-timeago">
				{millisecondsToTime(Date.now() - transaction.timestamp)} ago
			</span>
		</div>
	{/each}
{/if}

<style>
	.difference-positive {
		color: #0f0;
	}
	.difference-negative {
		color: red;
	}

	.transaction-timeago {
		color: var(--theme-darker-text);
	}

	.transaction-player {
		font-family: Minecraft, 'Atkinson Hyperlegible', sans-serif;
		font-size: 0.8em;
	}

	.bank-main-current-balance {
		margin: 0.5em 0;
		color: var(--theme-darker-text);
	}

	.bank-main-current-balance-value {
		color: var(--theme-main-text);
	}
	p {
		margin: 0;
	}
</style>

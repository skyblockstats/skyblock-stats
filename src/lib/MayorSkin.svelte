<script lang="ts">
	import { toTitleCase } from '$lib/utils'
	export let name: string

	const skinIds = {
		// normal mayors
		barry: 'f04c591b164746e848f3d6a451ee87a62dd193e5c45e94ed78e72df119aca426',
		paul: '1b59c43d8dbccfd7ec6e6394b6304b70d4ed315add0494ee77c733f41818c73a',
		aatrox: 'c1bdf505bb8c0f1f3365a03032de1931663ff71c57e022558de312b8f1b5c445',
		foxy: '3485a717fa0f51d7fadc66a5d5e9853905bef914e3b2848a2f128e63d2db87',
		cole: '16422de08848952d1cbead66bbbad6f07191bdcc952f3d1036aeb0c22938f39b',
		marina: '807fc9bee8d3344e840e4031a37249a4c3c87fc80cf16432cc5c2153d1f9c53d',
		diaz: '9cf4737cd444b590545734a6408cbe23c182f4283f167a3e3c09532ccbef17f9',
		diana: '83cc1cf672a4b2540be346ead79ac2d9ed19d95b6075bf95be0b6d0da61377be',

		// special mayors
		derpy: 'be0f89466528ad5eca5a6506adddd896ff78c4fd21facaa74a8c4a809c89207',
		scorpius: '8f26fa0c47536e78e337257d898af8b1ebc87c0894503375234035ff2c7ef8f0',
		finnegan: 'e7747fbee9fb39be39b00d3d483eb2f88b4bae82417ab5cb1b1aa930dd7b6689',

		// unique mayors
		technoblade: '786c039d969d1839155255e38e7b06a626ea9f8baf9cb55e0a77311efe18a3e',
		dante: '5af658e00ac0d0ce0686e79f59c067b9577c01ba57ad8c6575db8490c3161772',
		faith: '64b39d0756b92b8b7599d1f971580088954e21c5f60c673d0d4f63693fb002b5',
	}

	let url: string | undefined
	$: {
		if (name.toLowerCase() === 'jerry') url = '/villager.png'
		else {
			const skinId = skinIds[name.toLowerCase()]
			url = skinId ? `https://mc-heads.net/body/${skinId}` : undefined
		}
	}
</script>

{#if url}
	<img src={url} alt="Mayor {toTitleCase(name)}" />
{:else}
	<div class="no-skin-found">Unknown mayor</div>
{/if}

<style>
	img {
		display: block;
		width: 5em;
		height: 12em;
		margin: 0 auto;
	}

	.no-skin-found {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 12em;
		margin: 0 auto;
	}
</style>

<script lang="ts">
	import Head from '$lib/Head.svelte'

	import Header from '$lib/Header.svelte'

	let data = ''
	let ign = ''
	let transparentBackground = false
	let modeId: string

	let generatedUrl = ''

	$: modeUsesData = !['fr', 'f', 'fdeny', 'gdisband', 'pinvite'].includes(modeId)
	$: modeUsesIgn = !['custom'].includes(modeId)

	let imageDisplay: 'none' | 'block' = 'none'

	function generateImage() {
		let url = 'https://fake-chat.matdoes.dev/render.png?'
		url = url + `m=${modeId}`
		if (modeUsesIgn) url += `&u=${ign}`
		if (modeUsesData) url += '&d=' + encodeURIComponent(data)
		if (transparentBackground) url += '&t=1'

		generatedUrl = url
		imageDisplay = 'none'
	}
</script>

<Head title="Hypixel Fake Chat Generator" />
<Header />

<main>
	<h1>Hypixel Fake Chat Generator</h1>
	<select id="modes" bind:value={modeId}>
		<option value="chat">Public chat</option>
		<option value="dm">Private message</option>
		<option value="fr">Friend request</option>
		<option value="f">Friend accept</option>
		<option value="fdeny">Friend deny</option>
		<option value="gchat">Guild chat</option>
		<option value="gdisband">Guild disband</option>
		<option value="pchat">Party chat</option>
		<option value="pinvite">Party invite</option>
		<option value="custom">Custom</option>
	</select>
	{#if modeUsesIgn}
		<input id="ign" placeholder="Enter user" bind:value={ign} />
	{/if}
	{#if modeUsesData}
		<input id="data" placeholder="Enter message" bind:value={data} />
	{/if}
	<label>
		<input type="checkbox" id="transparent-background" bind:checked={transparentBackground} /> Transparent
		background
	</label>
	<button id="generate" on:click={generateImage}>Generate image</button>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		src={generatedUrl}
		id="outputImage"
		style="display:{imageDisplay}"
		on:load={() => (imageDisplay = 'block')}
	/>
</main>

<style>
	input {
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	button {
		background-color: #222;
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #aaa;
	}
	select,
	input,
	button {
		display: block;
		margin-bottom: 0.5em;
	}
	#transparent-background {
		display: inline-block;
	}
</style>

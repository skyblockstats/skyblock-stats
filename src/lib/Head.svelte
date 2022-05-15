<script lang="ts">
	function serializeHtml(text: string) {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;')
	}

	/** The title that is shown at the top of the page and in search engines */
	export let title = 'SkyBlock Stats'
	/** The description that is shown in search engines */
	export let description = ''
	/** The title that is shown in platforms like Discord */
	export let metaTitle = title
	/** The description that is shown in platforms like Discord */
	export let metaDescription = description
</script>

<svelte:head>
	<title>{title}</title>
	<!--
		svelte puts "\n" instead of actual newlines so we have to do this hack :(
		if we don't do this it looks bad on discord and probably other places
	-->
	<meta property="og:title" content={metaTitle} />
	{@html `<meta name="description" content="${serializeHtml(description)}" />`}
	{@html `<meta property="og:description" content="${serializeHtml(metaDescription)}" />`}
</svelte:head>

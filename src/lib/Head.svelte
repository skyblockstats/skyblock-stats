<script lang="ts">
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
	<meta name="description" content={description} />
	<meta property="og:title" content={metaTitle} />
	<meta property="og:description" content={metaDescription} />
</svelte:head>

<script context="module">
	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		const res = await this.fetch(`aktuality/${params.slug}.json`)
		const data = await res.json()

		if (res.status === 200) {
			return { post: data }
		} else {
			this.error(res.status, data.message)
		}
	}
</script>

<script>
import FirstPage from "../../components/FirstPage.svelte";
import Index from "../index.svelte";

	export let post;
</script>

<style>
	/*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
	/* .content :global(h2) {
		font-size: 1.4em;
		font-weight: 500;
	}

	.content :global(pre) {
		background-color: #f9f9f9;
		box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
		padding: 0.5em;
		border-radius: 2px;
		overflow-x: auto;
	}

	.content :global(pre) :global(code) {
		background-color: transparent;
		padding: 0;
	}

	.content :global(ul) {
		line-height: 1.5;
	}

	.content :global(li) {
		margin: 0 0 0.5em 0;
	} */

	section {
		display: flex;
		flex-direction: column;
		text-align: left;
	}
	
</style>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<section class="top iverted">
	<h1>{post.title}</h1>
	<p><em>Zveřejněno {post.postedOn}</em></p>
	<div class="content">
		{@html post.html}
	</div>
	{#if post.poster}
		<embed type="pdf" src="photos/{post.poster}" width="800px" height="2100px" />
	{/if}
	{#if post.images.length > 0}
		<!-- image galery -->
	{/if}
</section>
	

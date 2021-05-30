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
	section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding-left: 150px;
	}
	
	h1 {
		margin-top: 70px;
		margin-bottom: 0;
	}

	div.content {
		margin-top: 12px;
	}

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

	div.galery {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		justify-content: center;
		margin: 40px 0;
	}

	div.photo{
		width: 210px;
		height: 297px;
		border-radius: 2px;
		margin: 24px 10px;
		overflow: hidden;
        border-bottom: 1px solid transparent;
	}

	div.poster {
		width: 315px !important; 
		height: 441px !important;
	}

    div.photo:hover {
        cursor: pointer;
        box-shadow: 0.5px 0.5px 15px 0px #00000033;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        border-radius: 0;
        transition: 300ms;
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
		<div class="photo poster">
			<img class="poster" alt="poster" src="photos/{post.poster}">
		</div>
	{/if}
	{#if post.images.length > 0}
		<div class="galery">
			{#each post.images as image}
				<div class="photo">
					<img alt={image} src="photos/{image}">
				</div>
			{/each}
		</div>
	{/if}
</section>
	

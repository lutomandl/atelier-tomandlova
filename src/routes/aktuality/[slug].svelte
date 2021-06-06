<script context="module">
	export async function preload({ params }) {
		// the `slug` parameter is available because
		// this file is called [slug].svelte
		
		const res = await this.fetch(`https://admin.ateliertomandlova.cz/Posts?slug=${params.slug}`)
		const posts = await res.json()
		const post = posts[0]
	
		if (!res.ok) {
			this.error(res.status, posts.message)
		} else {
			return { post }
		}

	}
</script>

<script>
	import marked from 'marked'

	export let post


	const postedOn = new Date (post.published_at)
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	const postedOnCs = postedOn.toLocaleDateString('cs', options)

	const markdown = marked(post.content)
</script>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	div.back {
		position: absolute;
		left: 200px;
		top: 100px;
		
	}
	
	h1 {
		margin-top: 70px;
		margin-bottom: 0;
	}

	div.content {
		margin-top: 12px;
		padding: 0 25%;
		text-align: left;
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

    /* div.photo:hover {
        cursor: pointer;
        box-shadow: 0.5px 0.5px 15px 0px #00000033;
    } */

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        border-radius: 0;
        transition: 300ms;
    }

	@media (max-width: 1024px) {
		div.back {
			left: 50px;
			top: 80px;
		}
	}

	@media (max-width: 800px) {
		div.content {
			padding: 0;
		}
	}
</style>

<svelte:head>
	<title>{post.heading}</title>
</svelte:head>

<section class="top iverted">
	<div class="back"><h2><a href="aktuality">Zpět</a></h2></div>
	<h1>{post.heading}</h1>
	<p><em>Zveřejněno {postedOnCs}</em></p>
	<div class="content">
		{@html markdown}
	</div>
	{#if post.poster}
		<div class="photo poster">
			<img class="poster" alt="{post.poster.name}" src="https://admin.ateliertomandlova.cz{post.poster.url}">
		</div>
	{/if}
	{#if post.images.length > 0}
		<div class="galery">
			{#each post.images as image}
				<div class="photo">
					<img alt={image} src="https://admin.ateliertomandlova.cz{image.url}">
				</div>
			{/each}
		</div>
	{/if}
</section>
	

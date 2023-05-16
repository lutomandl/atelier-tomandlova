
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
	import { onMount } from 'svelte'
	import GaleryViewer from '../../../components/GaleryViewer.svelte';

	export let post
	
	const STRAPI_BASE_URL = "https://admin.ateliertomandlova.cz"
  
	let PdfViewer
	onMount(async () => {
    const module = await import("svelte-pdf");
    PdfViewer = module.default;
  	});

	const postedOn = new Date (post.published_at)
	const options = { year: 'numeric', month: 'long', day: 'numeric' }
	const postedOnCs = postedOn.toLocaleDateString('cs', options)

	const markdown = marked(post.content)
</script>

<style>
	* { box-sizing: border-box; }

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

	div.wrapper {
		width: 815px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	@media (max-width: 1024px) {
		div.back {
			left: 50px;
			top: 80px;
		}

		div.wrapper {
			width: 100%
		}
	}

	@media (max-width: 850px) {
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
	<div class="wrapper">
		<h1>{post.heading}</h1>
		
		<p><em>Zveřejněno {postedOnCs}</em></p>
		
		<div class="content">
			{@html markdown}
		</div>

		{#if post.poster}
			<svelte:component this={PdfViewer} showBorder={false} scale=1.2 showButtons={true} url={`${STRAPI_BASE_URL}${post.poster.url}`}/>
		{/if}

		<GaleryViewer images={post.images}/>
			
	</div>
</section>
	

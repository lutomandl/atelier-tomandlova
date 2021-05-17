<script>
	import Posts from "../../components/PostsViewer.svelte"
	import posts from "./_posts.js"
</script>

<script context="module">
	export async function preload() {
		const response = await this.fetch(`aktuality.json`)
		const data = await response.json()
		return { data }
	}
</script>

<style>
	h1 {
		text-align: left;
		margin-top: 50px;
	}

	div.container {
		margin: 70px 0;
	}
</style>

<svelte:head>
	<title>Aktuality</title>
</svelte:head>

<section class="top">
	<h1>Aktuality</h1>
	<div class="container">
		<Posts {posts} />
	</div>
</section>


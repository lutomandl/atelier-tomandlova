<script>
	import Posts from "../../components/PostsViewer.svelte"
	import { onMount } from "svelte"

	let posts = []

	onMount( async () => {
		const parseJSON = (resp) => (resp.json ? resp.json() : resp)
		const checkStatus = (resp) => {
			if (resp.status >= 200 && resp.status < 300) {
				return resp;
			}
			return parseJSON(resp).then((resp) => {
				throw resp;
			})
  		}
  		const headers = {
    		'Content-Type': 'application/json',
  		}

		try {
			const res = await fetch("https://admin.ateliertomandlova.cz/posts?_sort=published_at:DESC", {
		  		method: "GET",
		  		headers: {
		     		'Content-Type': 'application/json'
		  		},
			}).then(checkStatus)
      		.then(parseJSON);
			posts = res
		} catch (e) {
			error = e
		}
	})
</script>

<script context="module">
	export async function preload() {
		const response = await this.fetch(`https://admin.ateliertomandlova.cz/posts?_sort=published_at:DESC`)
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


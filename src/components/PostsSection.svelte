<script>
    import Posts from "./PostsViewer.svelte"
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

    posts = posts.slice(0, 3);
</script>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    button {
        margin: 40px 0 ;
    }
</style>

<section id="posts">
    <h1>Aktuality</h1>
    <div class="container">
        <Posts {posts} />
    </div>   
    <a rel=prefetch href="aktuality"><button class="inverted">Více aktualit</button></a>
</section>



<script>
    import data from "../routes/aktuality/_posts.js"
    import Posts from "./PostsViewer.svelte"

    const posts = data.slice(0, 3);
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



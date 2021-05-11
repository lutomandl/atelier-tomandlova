<script>
    export let full;

    import posts from "data/_posts.js"
    import Post from "../components/Post.svelte"
</script>

<style>
    section {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    section.top > h1 {
        margin-top: 40px;
        text-align: left;
    }

    section.top > div > a > button {
        display: none;
    }

    div.container {
        display: flex;
        align-items: center;
        margin: 70px 0 40px 0;
    }

    button {
        margin: 0 0 100px 100px;
    }

    @media (max-width: 1000px) {
        div.container {
            flex-direction: column;
            align-items: center;
        }
    }
</style>

<section class={full ? "top" : undefined} id="news">
    <h1>Aktulity</h1>
    <div class="container">
        {#each posts as post}
            <Post {post} />
        {/each}

        <a href="aktuality"><button class="inverted">Více aktualit</button></a>
    </div>   
</section>



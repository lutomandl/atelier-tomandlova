<script>
    import posts from "data/_posts.js"
    import Post from "../components/Post.svelte"

    export let compact=true;
</script>

<style>
    div.container {
        display: flex;
        justify-content: space-around;
        margin: 70px 0 40px 0;
    }

    @media (max-width: 1000px) {
        div.container {
            flex-direction: column;
            align-items: center;
        }
    }
</style>

{#if compact}
    <section id="news">
        <h1>Aktuálně</h1>
        <div class="container">
            {#each posts as post}
                <Post {post} />
            {/each}
        </div>
        <a href="aktuality"><button class="inverted">Více aktualit</button></a>
    </section>
{/if}

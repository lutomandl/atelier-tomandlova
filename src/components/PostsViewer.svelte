<script>
    export let posts;

    import Post from "../components/Post.svelte"
</script>

<style>
    div.container {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    div.carousel {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
</style>

{#if posts.lenght <= 3}
    <div class="container">
        {#each posts as post}
            <Post {post} />
        {/each}
    </div>
{:else}
    <!-- carousel view TBD -->
    <div class="carousel">
        {#each posts as post}
            <Post {post} />
        {/each}
    </div>
{/if}


<script>
    export let post
</script>

<style>
    div.post {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 24px;
    }

    div.post:hover {
        cursor: pointer;
    }

    div.post:hover > div.photo > img {
        box-shadow: 0.5px 0.5px 5px 0px #00000075;
    }

    img {
        max-width: 100%;
        max-height: 100%;
    }

    div.photo {
        height: 350px;
        max-width: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.info {
        text-align: left;
        padding-top: 18px;
        padding-left: 24px;
    }

    div.info > span,h2,h3 {
        max-width: 250px;
        display: block;
        white-space: nowrap;
        overflow: hidden !important;
        text-overflow: ellipsis;
    }

</style>

<div class="post">
    <div class="photo">
        <img alt="{post.image}" src="{post.image}">
    </div>
    
    
    <div class="info">
        <h2>{post.title}</h2>
        <h3>{post.postedOn}</h3>
        <span>{post.html}</span>
    </div>
</div>

<script>
    export let post
</script>

<style>
    a.wrapper {
        text-decoration: none;
    }

    div.post {
        width: 300px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 24px;
        background-color: #E5CDC6;
        padding-bottom: 24px;
        border-radius: 5px;
        overflow: hidden;
        border-bottom: 1px solid transparent;
    }

    div.post:hover {
        cursor: pointer;
        box-shadow: 0.5px 0.5px 15px 0px #00000033;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        border-radius: 0;
        transition: 300ms;
    }

    div.post:hover > div.photo > img {
        transform: scale(1.1);
    }

    div.photo {
        height: 250px;
        display: flex;
        overflow: hidden;
    }

    div.info {
        text-align: left;
        padding: 24px;
        height: 250px;
    }

    div.desc {
        height: 170px;
        overflow: hidden
    }
</style>

<a rel=prefetch class="wrapper" href="aktuality/{post.slug}">
    <div class="post">
        <div class="photo">
            <img alt="{post.images[0]}" src="photos/{post.images[0]}">
        </div>
        <div class="info">
            <h2>{post.title}</h2>
            <h3>{post.postedOn}</h3>
            <div class="desc">
                <p>{post.desc}</p>
            </div>
            <a rel=prefetch href="aktuality/{post.slug}"><p>Zobrazit více</p></a>
        </div>
    </div>
</a>

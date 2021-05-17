import posts from './_posts.js'

const contents = JSON.stringify(
    posts.map(post => {
        return {
            title: post.title,
            postedOn: post.postedOn,
            slug: post.slug,
            desc: post.desc,
            img: post.images[0],
        }
    })
)

export function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    })

    res.end(contents)
}

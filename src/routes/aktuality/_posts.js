// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
    {
        title: 'Spouštíme nový web',
        slug: 'novy-web',
        postedOn: '2021-05-31',
        images: [
            'cervene-saty-1.jpg',
            'cervene-saty-2.jpg',
            'cervene-saty-3.jpg',
        ],
        desc: 'Jak můžete vidět, máme nové stránky. A můžete se těšit na víc.',
        html: 'Jak můžete vidět, máme nové stránky. Postupně je budeme rozšiřovat o další části, připravujeme například část, kde se dozvíte něco více o přírodních materiálech, se kterými pracujeme. Postupně budeme také přidávat do sekce aktuality připravované akce i vzpomínky na akce minulé.',
    },
    {
        title: 'Otvíráme!',
        slug: 'otvrirame',
        postedOn: '2021-05-03',
        images: ['buretove-saty.jpg'],
        poster: null,
        desc: 'Po dlouhé pauze otvíráme obchod a těšíme se, až se s vámi zase uvidíme.',
        html: 'Po dlouhé pauze otvíráme obchod a těšíme se, až se s vámi zase uvidíme.',
    },
    {
        title: 'Sklo od Lady Vosejpkové',
        slug: 'sklo-lada',
        postedOn: '2021-05-01',
        images: [
            'lada-1.jpg',
            'lada-2.jpg',
            'lada-3.jpg',
            'lada-4.jpg',
            'lada-5.jpg',
            'lada-6.jpg',
            'lada-7.jpg',
            'lada-8.jpg',
            'lada-9.jpg',
        ],
        poster: null,
        desc: 'Podívejte se na krásnou kolekci skla od Lady Vosejpkové.',
        html: 'Podívejte se na krásnou kolekci skla od Lady Vosejpkové. S Ladou spolupracujeme již dlouhé roky, ale její tvorba nikdy neomrzí.',
    },
    {
        title: 'Létem s mákem 2020',
        slug: 'letem-s-makem-2020',
        postedOn: '2021-04-30',
        images: ['fialkove_1.jpg', 'fialkove_2.jpg'],
        poster: 'letem_s_makem-1.png',
        desc: 'Poslední akce proběhla minulé léto v Plzni. Už brzy se ale určitě můžete těšit na další.',
        html: 'Poslední akce proběhla minulé léto v Plzni. Už brzy se ale určitě můžete těšit na další.',
    },
]

posts.forEach(post => {
    post.html = post.html.replace(/^\t{3}/gm, '')
})

export default posts

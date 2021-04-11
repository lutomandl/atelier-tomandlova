// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'Jaro je tu',
		slug: 'mame-zavreno',
		postedOn: '2021-03-28',
		image: 'fialkove dlouhe saty.jpg',
		html: 'Je to mega dobrý, že je teplo.'
	},
    {
		title: 'Zavřeno kvůli opatřením',
		slug: 'mame-zavreno',
		postedOn: '2021-03-15',
		image: 'buretove saty - vlci mak.jpg',
		html: 'Kvůli aktuálním opatřením máme zevřeno. Ze stejného důvodu není možné cokoliv plánovat. Těšíme se, že na vás snad již brzy. Mezitím můžete sledovat náš nový web, kde budeme přidávat alespoň vzpomínky na lepší časy.'
	},
	{
		title: 'Spouštíme nový web',
		slug: 'novy-web',
		postedOn: '2021-03-01',
		image: 'cervene-bavlnene-saty.jpg',
		html: 'Jak můžete vidět, máme nové stránky. Postupně je budeme rozšiřovat o další části, připravujeme například část, kde se dozvíte něco více o přírodních materiálech, se kterými pracujeme. Postupně budeme také přidávat do sekce aktuality připravované akce i vzpomínky na akce minulé.'
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;

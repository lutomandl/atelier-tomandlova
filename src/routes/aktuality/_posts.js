// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const posts = [
	{
		title: 'Zavřeno kvůli opatřením',
		slug: 'mame-zavreno',
		postedOn: '2021-03-01',
		image: 'images/cervene-bavlnene-saty.jpg',
		html: `
			<p>Kvůli aktuálním opatřením máme zevřeno. Ze stejného důvodu není možné cokoliv plánovat. Těšíme se, že na vás snad již brzy. Mezitím můžete sledovat náš nový web, kde budeme přidávat alespoň vzpomínky na lepší časy.</p>
		`
	},
	{
		title: 'Zavřeno kvůli opatřením',
		slug: 'mame-zavreno',
		postedOn: '2021-03-01',
		image: 'images/cervene-bavlnene-saty.jpg',
		html: `
			<p>Kvůli aktuálním opatřením máme zevřeno. Ze stejného důvodu není možné cokoliv plánovat. Těšíme se, že na vás snad již brzy. Mezitím můžete sledovat náš nový web, kde budeme přidávat alespoň vzpomínky na lepší časy.</p>
		`
	},
	{
		title: 'Zavřeno kvůli opatřením',
		slug: 'mame-zavreno',
		postedOn: '2021-03-01',
		image: 'images/cervene-bavlnene-saty.jpg',
		html: `
			<p>Kvůli aktuálním opatřením máme zevřeno. Ze stejného důvodu není možné cokoliv plánovat. Těšíme se, že na vás snad již brzy. Mezitím můžete sledovat náš nový web, kde budeme přidávat alespoň vzpomínky na lepší časy.</p>
		`
	}
];

posts.forEach(post => {
	post.html = post.html.replace(/^\t{3}/gm, '');
});

export default posts;

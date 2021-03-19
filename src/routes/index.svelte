<script>
	import suit from "images/rezny_lneny_kostym.jpg"
	import dress from "images/cervene-bavlnene-saty.jpg"
</script>

<style>
	section#main-page {
		height: calc(100vh - 100px);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-left: 200px;
		padding-right: 50px;
		position: relative;
	}

	h1.title {
		font-size: 70px;
		font-weight: 400;
		margin: 0 0 0.5em 0;
		z-index: 2;
	}

	img.main-photo {
		height: 70vh;
		margin: 0 0 1em 0;
	}

	img.line {
		max-width: 40vw;
		position: absolute;
		top: 20px;
		left: 150px;
		z-index: 2;
	}

	img.circle {
		max-width: 30vw;
		position: absolute;
		top: 145px;
		right: 125px;
		z-index: 1;
	}

	img.small-circle {
		max-width: 15vw;
		position: absolute;
		top: 15px;
		right: 45px;
		z-index: 1;
	}

	a.more {
		position: absolute;
		bottom: 25px;
		left: calc(50vw - 15px);
	}

	img.arrow {
		width: 30px;
		z-index: 1;
	}

	section#our-work {
		width: 100vw;
		background-color: #E5CDC6;
		text-align: center;
		padding: 70px 0;
		position:relative;
	}

	div.icons {
		display: flex;
        justify-content: space-between;
		margin: 70px 10% 30px 10%;
	}

	div.icon {
		width: 30%;
		display: block;
		z-index: 1;
	}

	div.icon > img {
		max-width: 200px;
		margin-bottom: 28px;
	}

	img.half-circle {
		position:absolute;
		max-width: 40vw;
		left:20vw;
		bottom: -100px;
		z-index: 0;
	}

	section#news {
		text-align: center;
		padding: 70px;
	}
	.white {
		color: #E5E5E5;
	}

	img {
		max-width: 300px;
		margin-bottom: 24px
	}

	button {
		position: relative;
	}
</style>

<svelte:head>
	<title>Ateliér Tomandlová</title>
</svelte:head>

<section id="main-page">
	<img class="main-photo" alt="Režný lněný kostým" src="{suit}">
	<img class="line" alt="line" src="linka.svg">
	<h1 class="title">Ateliér Tomandlová</h1>
	<img class="circle" alt="circle" src="circle.svg">
	<img class="small-circle" alt="small circle" src="transparent-small-circle.svg">
	<a class="more" href="#our-work"><img class="arrow" alt="arrow down" src="arrow.svg"></a>
</section>

<section id="our-work">
	<h1>Naši práci charakterizuje...</h1>
	<div class="icons">
		<div class="icon">
			<img alt="design" src="design.svg">
			<h2>Jedinečný design</h2>
			<p>Komfortní oděv vzniká promyšleným výběrem tkaniny, individuálně voleným tvarem, hrou barev a kompozicí výtvarného detailu.</p>
		</div>
		<div class="icon">
			<img alt="fabric" src="fabric.svg">
			<h2>Kvalitní materiály</h2>
			<p>Podstatnou složkou je kvalitní přírodní materiál, jeho krása, jedinečnost a specifické vlastnosti, blahodárné pro lidské tělo.</p>
		</div>
		<div class="icon">
			<img alt="sewing machine" src="sewing-machine.svg">
			<h2>Ruční výroba</h2>
			<p>Naše oděvy by nebyly, jaké jsou, bez mistrovského krejčovského zpracování.</p>
		</div>
	</div>
	<button>Zjistit více</button>
	<img class="half-circle" alt="half-circle" src="half-circle.svg">
</section>

<section id="news">
	<h1 class="white">Aktuálně</h1>
	<img alt="červené bavlněné šaty" src="{dress}">
	<h2 class="white">Vzhledem k aktuálním vládním opatřením máme zavřeno a nemůžeme cokoliv plánovat.<br>
		Až to bude jen trochu možné, dáme vám vědět.<br>
		Pokud potřebujete individuální konzultaci, neváhejte nás <a href="kontakt">kontaktovat</a>.
	</h2>
</section>
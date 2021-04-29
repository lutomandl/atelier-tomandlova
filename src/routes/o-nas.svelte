<svelte:head>
	<title>O nás</title>
</svelte:head>

<style>
	p.quote {
		font-size: 25px;
		line-height: 1.2;
		font-style: italic;
		text-align: right;
	}
	
	p.inverted {
		color: #E5E5E5;
	}

	section.top {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: 150px;
	}

	div.intro {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: left;
		padding-top: 60px;
		width: 700px;
	}

	div.intro > h1 {
		margin-bottom: 50px;
	}
	
	div.photo {
		margin-left: 50px;
	}

	img {
		width: 450px;
		z-index: 1;
	}

	div.photo > img.pencil {
		width: 300px;
		margin-left: -100px;
		margin-top: -50px;
		z-index: 2;
	}

	div.wrapper {
		display: flex;
		justify-content: flex-start;
		align-items: flex-end;
		padding: 70px;
	}

	div.info {
		padding-left: 50px;
		max-width: 700px;
		text-align: left;
	}

	div.photo > img.splash {
		margin-top: -50px;
		margin-left: -250px;
		width: 550px;
		z-index: 0;
	}

	@media (max-width: 1200px) {
		div.wrapper {
			padding: 0;
		}
	}
	
	@media (max-width: 1000px) {
		section.top {
			flex-direction: column;
			align-items: flex-end;
		}

		div.intro {
			width: unset;
		}

		div.photo {
			margin-top: 50px;
			margin-left: 0;
		}

		div.photo > img.pencil {
			margin-left: 0;
			margin-top: -150px;
		} 

		div.wrapper {
			flex-direction: column;
		}

		div.info {
			padding-left: 0;
		}

		div.photo > img.splash {
			margin-left: 0;
			margin-top: -85px;
			left: 25px;
			width: 500px;
		}
	}

	@media (max-width: 500px) {
		img {
			width: 100%;
		}

		img.pencil {
			width: 270px;
		}

		div.photo > img.splash {
			width: 350px;
		}
	}

</style>
<section class="top light">
	
	<div class="intro">
		<h1>O nás</h1>
		<div>
			<p>
				Lenka Tomandlová vystudovala Libereckou textilní fakultu, oděvní tvorbě se věnuje téměř 30&nbsp;let. 
				Ateliér sídlí v historickém centru Chebu a je dnes už neoddělitelnou součástí starého města.
			</p>
			<p class="quote">
				„Středem mého zájmu i samotnou inspirací je mi přírodní materiál, jeho krása, 
				jedinečnost a specifické vlastnosti, blahodárné pro lidské tělo.”
			</p>
		</div>
		
	</div>
	<div class="photo">
		<img class="graphics pencil" alt="graphic" src="Pencil-blue.svg">
		<img alt="lenka" src="lenka.jpg">
	</div>	
</section>
<section>
	<p class="quote inverted">
		„Komfortní oděv pak vzniká promyšleným výběrem tkaniny, 
		individuálně voleným tvarem, hrou barev, kompozicí výtvarného detailu a v neposlední 
		řadě mistrovským krejčovským zpracováním Olgy Dražanové a Nelly Kaiseršotové.“
	</p>
	<div class="wrapper">
		<div class="photo">
			<img alt="atelier" src="odevni-atelier.jpeg">
			<img class="graphics splash" alt="graphics" src="Splash.svg">
		</div>
		<div class="info">
			<p>
				Pravidelně pořádáme prodejní výstavy v Chebu i v Plzni a účastníme se i festivalu Chebské Dvorky. 
				Více informací je k dispozici v sekci <a href="aktuality">Aktuality</a>.
			</p>
			<p>
				V našem ateliéru najdete, kromě naší tvorby i nádherné autorské šperky a sklo od <a href="http://www.ladavosejpkova.cz" target="_blank">Lady Vosejpkové</a>. 
				Dlouhodobě spolupracujeme i s fotografkou <a href="http://www.foto-hajsmanova.wz.cz" target="_blank">Evou Hajšmanovou</a>. 
			</p>
		</div>
	</div>
</section>	
	
	
	






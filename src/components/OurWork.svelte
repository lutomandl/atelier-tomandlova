<style>
    div.icons {
        display: flex;
        justify-content: space-between;
        margin: 70px 0 30px 0 ;
    }

    div.icon {
        width: 350px;
        display: block;
        margin: 0 24px;
    }

    div.icon > img {
        width: 200px;
        height: 200px;
        margin-bottom: 28px;
    }

    img.half-circle {
        width: 600px;
        bottom: -100px;
        left: 400px;
    }

    @media (max-width: 1024px) {
        div.icons {
            margin: 70px 0px 30px 0px;
        }

        div.icon > img {
            width: 150px;
            height: 150px;
        }

        img.half-circle {
            left: 0

        }
    }

    @media (max-width: 750px) {
        div.icons {
            flex-direction: column;
            align-items: center;
            margin-top: 24px;
        }

        div.icon {
            margin-top: 24px;
            width: fit-content;
        }

        img.half-circle {
            width: 350px;
        }
    }

    @media (max-width: 450px) {
        img.half-circle {
            width: 290px;
        }
    }
</style>

<section id="our-work" class="light">
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
	<a href="o-nas"><button>Zjistit více</button></a>
	<img class="graphics half-circle" alt="half-circle" src="half-circle.svg">
</section>
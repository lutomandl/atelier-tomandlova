<script>
    import suit from "images/rezny_lneny_kostym.jpg"
</script>

<style>
    section {
		height: calc(100vh - 140px);
		display: flex;
		justify-content: space-between;
	}

    h1 {
		font-size: 70px;
	}

    img.main-photo {
		height: 70vh;
        max-height: 1000px;
		z-index: 1;
        margin-left: 100px;
	}

    /* arrow down */
    a.more {
		position: absolute;
		bottom: 25px;
		left: calc(50vw - 15px);
	}

	img.arrow {
		width: 30px;
	}

    /* graphics */
	img.line {
		width: 35vw;
        max-width: 500px;
		top: 5vw;
		left: 10vw;
	}

	img.circle {
		width: 30vw;
        max-width: 600px;
		top: 145px;
		right: 125px;
	}

	img.small-circle {
		max-width: 15vw;
		top: 15px;
		right: 45px;
	}

    @media (max-width: 1024px) {
        h1 {
            font-size: 58px;
        }

        img.main-photo {
            margin-left: 0px;
        }
    }
</style>

<section id="first" class="top">
	
    <img class="main-photo" alt="Režný lněný kostým" src="{suit}">
	<h1>Ateliér Tomandlová</h1>
	
    <!-- arrow down -->
    <a class="more" href="#our-work"><img class="arrow" alt="arrow down" src="arrow.svg"></a>

    <!-- graphics -->
    <img class="graphics line" alt="line" src="linka.svg">
    <img class="graphics circle" alt="circle" src="circle.svg">
	<img class="graphics small-circle" alt="small circle" src="transparent-small-circle.svg">
</section>
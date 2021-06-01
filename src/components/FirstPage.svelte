<style>
    section {
		min-height: calc(100vh - 140px);
		display: flex;
		justify-content: space-between;
        text-align: right;
	}

    h1 {
		font-size: 70px;
        margin-left: 24px;
	}

    img.main-photo {
		height: 600px;
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
		width: 500px;
        margin-top: -30px;
	}

	img.circle {
		width: 450px;
		top: 145px;
		right: 125px;
        z-index: 0;
	}

	img.small-circle {
		width: 15vw;
        min-width: 100px;
		top: 15px;
		right: 45px;
	}

    @media (max-width: 1200px) {
        
        h1 {
            font-size: 58px;
        }

        img.main-photo {
            margin-left: 50px;
            height: 500px;
        }

        img.circle {
            width: 350px;
            top: 200px;
        }
    }

    @media (max-width: 800px) {
        section {
            flex-direction: column-reverse;
            justify-content: flex-start;
            align-items: flex-end;
        }
        
        img.main-photo {
            margin-left: 0px;
            height: 400px;
        }

        h1 {
            margin: 24px 12px;
            font-size: 48px;
        }

        img.line {
            width: 300px;
            bottom: -50px;
            right: 0;
        }

        img.circle {
            top: 50px;
            left: 50px;
            width: 250px;
        }

        a.more {
            display: none;
        }
    }
</style>

<section id="first" class="top">
	<div class="left">
        <img class="graphics line" alt="line" src="graphics/Linka.svg">
        <img class="main-photo" alt="Režný lněný kostým" src="photos/rezny_lneny_kostym.jpg">
    </div>
    <div class="right">
        <img class="graphics circle" alt="circle" src="graphics/Circle.svg">
        <h1>Ateliér Tomandlová</h1>
    </div>
	
    <!-- arrow down -->
    <a class="more" href="#our-work"><img class="arrow" alt="arrow down" src="graphics/arrow.svg"></a>

    <!-- graphics -->
	<img class="graphics small-circle" alt="small circle" src="graphics/Transparent-small-circle.svg">
</section>
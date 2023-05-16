<script>
    import OpeningHours from './OpeningHours.svelte'
</script>

<style>
    section.light {
        display: flex;
        justify-content: center;
    }

    div.container {
        display: grid;
        grid-template-columns: 150px 300px;
        column-gap: 30px;
    }

    div.column {
        display: flex;
        flex-direction: column;
        text-align: left;
        overflow: visible;
    }

    img.logo {
        width: 150px;
    }

    img.small-circle {
        width: 300px;
        position: absolute;
        top: -30px;
    }

    p {
        margin-top: 0;
    }

    @media (max-width: 500px) {
        div.container {
            display: flex;
            flex-direction: column;
        }

        img.logo {
            margin-bottom: 24px;
        }

        img.small-circle{
            width: 220px;
            top: -40px;
            left: 30px;
        }
    }
</style>


<footer>
    <section class="light">
        <div class="container">
            <div class="column">
                <img class="logo" alt="at-logo" src="graphics/logo.png">
                <img class="graphics small-circle" alt="circle" src="graphics/transparent-small-circle.svg">
            </div>
            <div class="column">
                <p>Ateliér Tomandlová<br>
                    Židovská 9<br>
                    Cheb
                </p>
                <a href="mailto:info@ateliertomandlova.cz"><p>info@ateliertomandlova.cz</p></a>
                <OpeningHours />
                <a href="kontakt"><button>Kontaktujte nás</button></a>
            </div>
        </div>
    </section>
</footer>
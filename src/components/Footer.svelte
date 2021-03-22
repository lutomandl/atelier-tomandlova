<script>

import Kontakt from "../routes/kontakt.svelte";

</script>
<style>
    section.light {
        display: flex;
        justify-content: center;
    }

    div.container {
        display: grid;
        grid-template-columns: 200px 200px;
        column-gap: 20px;
    }

    div.column {
        display: flex;
        flex-direction: column;
        text-align: left;
        overflow:visible;
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

    @media (max-width: 450px) {
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
                <img class="logo" alt="at-logo" src="logo.png">
                <img class="graphics small-circle" alt="circle" src="transparent-small-circle.svg">
            </div>
            <div class="column">
                <p>Ateliér Tomandlová<br>
                    Židovská 9<br>
                    Cheb
                </p>
                <a href="mailto:info@ateliertomandlova.cz"><p>info@ateliertomandlova.cz</p></a>
                <p>Po - Pá:&ensp;9 - 16 hod</p>
                <a href="kontakt"><button>Kontaktujte nás</button></a>
            </div>
        </div>
    </section>
</footer>
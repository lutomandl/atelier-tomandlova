<script>

import Kontakt from "../routes/kontakt.svelte";

</script>
<style>
    footer {
        
        width: 100vw;
        display: flex;
        justify-content: center;
        padding: 70px 0;
        position: relative;
    }

    section.light {
        display: grid;
        grid-template-columns: 200px 200px;
        column-gap: 20px;
        z-index: 2;
    }

    div.column {
        display: flex;
        flex-direction: column;
    }

    img {
        width: 150px;
    }

    img.small-circle {
        width: 15vw;
        position: absolute;
        top: -30px;
        left: 35vw;
    }

    p {
        margin-top: 0;
    }
</style>


<footer>
    <section class="light">
        <div class="column">
            <img alt="at-logo" src="logo.png">
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
    </section>
    <img class="small-circle" alt="circle" src="transparent-small-circle.svg">
</footer>
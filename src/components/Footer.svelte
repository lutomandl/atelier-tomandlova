<style>
    footer {
        background-color: #E5CDC6;
        width: 100vw;
        display: flex;
        justify-content: center;
        padding: 70px 0;
        position: relative;
    }

    div.wrapper {
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
    <div class="wrapper">
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
            <button>Kontaktujte nás</button>
        </div>
    </div>
    <img class="small-circle" alt="circle" src="transparent-small-circle.svg">
</footer>
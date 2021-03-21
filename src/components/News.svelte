<script> 
    export let compact;

    import dress from "images/cervene-bavlnene-saty.jpg"
</script>

<style>
	img {
		max-width: 300px;
		margin-bottom: 24px;
	}
</style>

{#if compact}
    <section id="news">
        <h1>Aktuálně</h1>
        <img alt="Červené bavlněné šaty" src="{dress}">
        <h2>Vzhledem k aktuálním vládním opatřením máme zavřeno a nemůžeme cokoliv plánovat.<br>
            Až to bude jen trochu možné, dáme vám vědět.<br>
            Pokud potřebujete individuální konzultaci, neváhejte nás <a href="kontakt">kontaktovat</a>.
        </h2>
    </section>
{/if}

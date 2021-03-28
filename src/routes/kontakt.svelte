<script>
	import {onMount} from "svelte";

	let form = {
		name: '',
		email: '',
		phone: '',
		message: ''
	}
	let validationError = null
  	let formSuccess = false

	function handleFormSubmit(event) {}

	async function uploadFormData(captchaResponse) {}

	function clearValidationError() {}

	onMount(() => {
		window.grecaptcha.ready(() => {
			window.grecaptcha.render('recaptcha', {
				sitekey: '6LeYsd4ZAAAAAJl8KFvFT4ZVsobOLzV-AtcEyLNU',
				size: 'invisible',
				callback: uploadFormData
			});
		})
	});
</script>

<style> 
	h1 {
		margin-top: 40px;
	}

	h2 {
		position: relative;
		bottom: -70px;
	}

	iframe {
		width: 100vw;
		height: 400px;
		position: relative;
		top: -50px;
		margin-bottom: -60px;
	}

	section {
		z-index: 2;
		text-align: left;
	}

	div.container {
		display: flex;
		justify-content: flex-start;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		 
	}

	label {
		margin: 24px 0 12px 0 ;
		font-size: 18px;
	}
	
	button {
		margin: 24px 0 12px 0 ;
	}

	textarea {
		outline: none;
		width: calc(100% - 24px);
		height: 150px;
		background-color: #B68981;
		border: none;
		border-radius: 2px;
		padding: 12px;
		color: #E5E5E5;
		font-size: 16px;
		resize: vertical;
	}

	div.contact {
		margin-left: 100px;
		font-size: 20px;
	}

	@media (max-width: 850px) {
		div.container {
			flex-direction: column;
		}

		div.contact {
			display: none;
		}
	}
</style>

<svelte:head>
	<title>Kontakt</title>
</svelte:head>

<section class="top light">
	<h1>Chcete více informací?</h1>
	<div class="container">
		<div class="form">
			<p>Pokud máte dotaz ohledně našich služeb nebo potřebujete poradit, neváhejte se na nás obrátit.</p>
			<form on:submit={handleFormSubmit}>
				<label>Jméno</label>
				<input bind:value={form.name} on:focus={clearValidationError}/>
			
				<label>Email</label>
				<input bind:value={form.email} on:focus={clearValidationError}/>
			
				<label>Zpráva</label>
				<textarea bind:value={form.message} on:focus={clearValidationError}></textarea>
			
				<button type="submit">
				  Odeslat
				</button>
			
				<div
				  id="recaptcha"
				></div>
			  </form>
		</div>
		<div class="contact">
			<p>Ateliér Tomandlová<br>
				Židovská 9<br>
				Cheb
			</p>
			<a href="mailto:info@ateliertomandlova.cz"><p>info@ateliertomandlova.cz</p></a>
			<p>Po - Pá:&ensp;9 - 16 hod</p>
		</div>
	</div>
	<h2>Kde nás najedete:</h2>
</section>
<iframe title="Mapa" src="https://www.google.com/maps/d/u/0/embed?mid=1SWF68fCUiI5m-XZ1Wj3KcP6NqhAyFTOk" frameborder="0"></iframe>

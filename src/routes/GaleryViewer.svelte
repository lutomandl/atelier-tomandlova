<script>
    import { tick } from 'svelte';
	import { crossfade, fade } from 'svelte/transition';
	import keyboard from '../useKeyboard';
	

    export let images = []

    const STRAPI_BASE_URL = "https://admin.ateliertomandlova.cz"

    let selected = '';
	let gallery;
	const [send, receive] = crossfade({
		duration: () => 350,
		fallback: fade,
	})
	
	const handlePreviewClick = (imageURL) => {
		selected = imageURL
	}
	
	$: currentIdx = selected ? images.findIndex(image => image === selected) : -1
	
	const shortcut = {
		'ArrowRight': async (e) => {
			e.preventDefault()
			const nextIdx = (currentIdx + 1) % images.length;
			selected = images[nextIdx]
			await tick()
			const active = gallery.querySelector('[data-selected="true"]');
			if (active) {
				active.scrollIntoView();
			}
		},
		'ArrowLeft': async (e) => {
			e.preventDefault();
			const nextIdx = currentIdx === 0 ? images.length - 1 : (currentIdx - 1) % images.length;
			selected = images[nextIdx]
			await tick()
			const active = gallery.querySelector('[data-selected="true"]');
			if (active) {
				active.scrollIntoView();
			}

  	}
	}
</script>

<style>
    .gallery-container {
		display: grid;
		grid-template-columns: repeat(4, 200px);
		grid-gap: 5px;
		margin-top: 50px;
	}
	
	/* .visually-hidden {
		visibility: hidden;
	} */
	
	.image {
		width: 100%;
		height: 250px;
		background: center / cover no-repeat;
		border-radius: 0;
        transition: 300ms;
		cursor: pointer;
	}

    div.image:hover {
        transform: scale(1.01);
    }
    .gallery {
		display: flex;
		margin-top: 24px;
	}
	
	.gallery > .image {
		flex-shrink: 0;
		margin-right: 8px;
		width: 100px;
		height: 100px;
		
	}
	
	.image-viewer {
		padding: 20px;
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -50px;
		right: 0;
		top: 0;
		background-color: rgba(179, 179, 179, 0.8);
		z-index: 100;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.active {
		border: 2px solid #b68981;
	}
	
	.image-viewer > img {
		max-height: 70%;
		max-width: 100%;
	}

	@media (max-width: 850px) {
		.gallery-container {
			grid-template-columns: repeat(3, 150px);
		}

		.image {
			height: 200px;
		}
	}

	@media (max-width: 500px) {
		.gallery-container {
			grid-template-columns: repeat(1, 200px);
		}

		.image {
			height: 250px;
		}
	}
</style>

{#if images.length > 0}
	<div class="gallery-container">
		{#each images as image}
			<div>
				<div role="img" aria-label="{image.name}" out:send={{key:`${STRAPI_BASE_URL}${image.formats.small.url}`}} in:receive={{key: `${STRAPI_BASE_URL}${image.formats.small.url}`}} on:click={() => handlePreviewClick(`${STRAPI_BASE_URL}${image.url}`)} class="image" style="background-image: url({`${STRAPI_BASE_URL}${image.formats.small.url}`});" />
			</div>
		{/each}	
    </div>
			
    {#if selected}
		<div class="image-viewer" on:click={(e) => {
    		if (e.target === e.currentTarget) {
        		selected = ''
			}	
		}}>
			<!-- {#if currentIdx > 0}
				<button on:click={() => {
					const nextIdx = (currentIdx - 1) % images.length;
					selected = `${STRAPI_BASE_URL}${images[nextIdx].url}`
				}}>
					Předchozí	
				</button>
			{/if}
			{#if currentIdx = images.length - 1}
			<button on:click={() => {
						const nextIdx = (currentIdx + 1) % images.length;
				selected = `${STRAPI_BASE_URL}${images[nextIdx].url}`
		
				}}>
				Další
			</button>
			{/if} -->
			<img in:receive={{key:selected}} out:send={{key: selected}} src="{selected}" alt="{selected}" />
			<div role="group" bind:this={gallery} use:keyboard={{ shortcut }} class="gallery" tabindex={0}>
				{#each images as image}
					<div role="img" data-selected={selected === `${STRAPI_BASE_URL}${image.url}`} class:active={selected === `${STRAPI_BASE_URL}${image.url}`} on:click={() => selected = `${STRAPI_BASE_URL}${image.url}`} class="image" style="background-image:url({`${STRAPI_BASE_URL}${image.url}`})" />
				{/each}
			</div>
		</div>
		{/if}
			<!-- <p class="visually-hidden" aria-atomic={true} aria-live="assertive">
				{#if images[currentIdx]}
					{post.heading}
				{/if}
			</p> -->
		{/if}
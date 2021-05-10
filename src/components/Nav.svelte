<script>
	import MobileMenu from "./MobileMenu.svelte";
	
	export let segment;
</script>

<style>
	nav {
		height: 100px;
		font-weight: 300;
		padding: 0 48px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		z-index: 99;
	}

	ul {
		margin: 0;
		padding-right: 8px;
		text-align: right;
		display: flex;
	}

	li {
		display: block;
		float: left;
		padding-left: 24px;
	}

	img.logo {
		width: 80px;
		margin-left: 48px;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 16px);
		height: 1px;
		background-color: #585858;
		display: block;
		bottom: 12px;
	}

	a {
		text-decoration: none;
		padding: 16px 8px;
		display: block;
	}

	@media (max-width: 850px) {
		ul {
			display: none;
		}

		nav {
			justify-content: space-between;
			padding: 0 15px;
		}
	}

	@media (min-width: 850px) {
		div.mobileMenu {
			display: none;
		}
	}

</style>

<nav>
	<ul>
		<li><a aria-current="{segment === 'o-nas' ? 'page' : undefined}" href="o-nas">o nás</a></li>
		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		<li><a rel=prefetch aria-current="{segment === 'aktuality' ? 'page' : undefined}" href="aktuality">aktuality</a></li>
		<!-- <li><a aria-current="{segment === 'sluzby' ? 'page' : undefined}" href="sluzby">služby a ceny</a></li>
		<li><a aria-current="{segment === 'materialy' ? 'page' : undefined}" href="materialy">péče o materiály</a></li> -->
		<li><a aria-current="{segment === 'kontakt' ? 'page' : undefined}" href="kontakt">kontakt</a></li>
	</ul>
	
	<div class="mobileMenu">
		<MobileMenu />
	</div>
	
	<a href="."><img class="logo" alt="logo-at" src="logo.png"/></a>
</nav>

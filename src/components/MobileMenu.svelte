<script>
    let menuOpened = false;

    function toggleMenu() {
        if (menuOpened) {
            menuOpened = false;
        } else {
            menuOpened = true;
        }
    }
</script>

<style>
    div.burger-button {
        position: fixed;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: 7;
        height: 80px;
        width: 80px;
        transition: 200ms;
    }

    div.burger-button.menuOpened {
        left: 240px;
    }

    div.burger-button > img {
        width: 24px;
        position: relative;
        top: 28px;
        left: 28px;
    }

    div.menu-tab {
        background: #ffffffb0;
        position: fixed;
        top: 0;
        width: 320px;
        height: 100vh;
        left: -320px;
        z-index: 6;
        transition: 200ms;
        overflow-y: scroll;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    div.menu-tab.menuOpened {
        left: 0;
    }

    img.logo {
        position: fixed;
        top: 24px;
        left: -320px;
        transition: 200ms;
        width: 80px;
    }

    img.logo.menuOpened {
        left: 24px; 
    }

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        padding: 0;
        margin: 90px 0;
    }

    li {
        padding: 24px;
        display: block;
    }

    a {
		text-decoration: none;
		display: block;
        font-size: 18px;
	}

    div.backdrop {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #000;
        opacity: 0.25;
        z-index: 5;
    }

    div.backdrop.menuOpened {
        display: block;
    }
</style>
  
<div class="burger-button" class:menuOpened on:click={toggleMenu}>
    {#if menuOpened}
        <img src="x.svg" alt="Menu" />
    {:else}
        <img src="menu.svg" alt="Menu" />
    {/if}
</div>
<div class="menu-tab" class:menuOpened>
    <a href="#first" on:click={toggleMenu}><img class="logo" class:menuOpened alt="logo-at" src="logo.png"/></a>
    <ul>
        <li><a href="o-nas" on:click={toggleMenu}>o nás</a></li>
        <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
            the blog data when we hover over the link or tap it on a touchscreen -->
        <li><a rel=prefetch href="aktuality" on:click={toggleMenu}>aktuality</a></li>
        <!-- <li><a href="sluzby" on:click={toggleMenu}>služby a ceny</a></li>
        <li><a href="materialy" on:click={toggleMenu}>péče o materiály</a></li> -->
        <li><a href="kontakt" on:click={toggleMenu}>kontakt</a></li>
    </ul>
</div>

<div class="backdrop" class:menuOpened on:click={toggleMenu} />
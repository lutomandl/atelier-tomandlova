<!-- <script context="module">
	export function preload() {
		return this.fetch(`aktuality.json`).then(r => r.json()).then(posts => {
			return { posts };
		});
	}
</script> -->

<script>
	import News from "../../components/News.svelte";
</script>

<style>

</style>

<svelte:head>
	<title>Aktuality</title>
</svelte:head>

<News full={true}  />

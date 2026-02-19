<script lang="ts">
	import welcomeFallback from '$lib/images/svelte-welcome.png';
	import welcome from '$lib/images/svelte-welcome.webp';
	import Canvas from '$lib/components/Canvas.svelte';
</script>

<svelte:head>
	<title>Coatline</title>
	<meta name="description" content="Coatline's Portfolio" />
</svelte:head>

<section>
	<Canvas />
	<h1 class="physical">Coatline</h1>
	<button class="physical">Start</button>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
		font-size: 4rem;
		font-family: Arial, Helvetica, sans-serif;
		text-align: center;
		font-weight: bold;
		color: "#ff6347";
	}

	button{
		margin-top: 2rem;
		padding: 1rem 2rem;
		font-size: 1.5rem;
		font-weight: bold;
		color: #fff;
		background-color: #ff6347;
		border: none;
		border-radius: 8px;
		cursor: pointer;
	}
</style>

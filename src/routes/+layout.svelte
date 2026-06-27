<script lang="ts">
  import Header from "../lib/components/Header.svelte";
  import "./layout.css";

  let { children } = $props();
</script>

<Header />

<main>
  {@render children()}
</main>

<style>
  main {
    width: 100%;
    box-sizing: border-box;
  }
</style>

<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { Physics } from "$lib/physics/Physics";
  import { PhysicsString } from "$lib/physics/PhysicsString";
  import { HtmlToPhysics } from "$lib/physics/HtmlToPhysics";
  import type { PhysicsObject } from "$lib/physics/PhysicsObject";

  let canvas: HTMLCanvasElement;
  let animationFrame: number;

  onMount(() => {
    if (!browser) return;

    const ctx = canvas.getContext("2d")!;
    const physics = new Physics();
    const physicsConverter = new HtmlToPhysics(physics);
    physicsConverter.initialize();

    // let coatline = new PhysicsString(
    //     "COATLINE", "bold 80px Arial", 
    //     window.innerWidth / 2, 200, 
    //     physics.world
    // );

    // physics.add(coatline);

    const loop = () => {
      physics.update(ctx);
      animationFrame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrame);
      physics.cleanup();
    };
  });
</script>

<canvas 
  bind:this={canvas} 
  width={browser ? window.innerWidth : 0} 
  height={browser ? window.innerHeight : 0}
></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    background: #0a0a0a;
    display: block;

  }
</style>
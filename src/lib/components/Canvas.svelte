<script lang="ts">
  import type { PhysicsObject } from "$lib/physics/PhysicsObject";
  import { PhysicsString } from "$lib/physics/PhysicsString";
  import { browser } from "$app/environment";
  import Matter from "matter-js";
  import { onMount } from "svelte";

  let canvas: HTMLCanvasElement;
  let physicsObjects: PhysicsObject[] = [];
  let animationFrame: number;

  onMount(() => {
    if (!browser) return;

    const ctx = canvas.getContext("2d")!;
    const engine = Matter.Engine.create();
    const world = engine.world;

    const title = new PhysicsString(
      "COATLINE",
      "bold 80px Arial",
      window.innerWidth / 2,
      200,
      world,
    );
    physicsObjects.push(title);

    const renderLoop = () => {
      Matter.Engine.update(engine, 1000 / 60);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      physicsObjects.forEach((obj) => obj.update(ctx));

      animationFrame = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrame);
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  });
</script>

<canvas
  bind:this={canvas}
  width={window.innerWidth}
  height={window.innerHeight}
>
</canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: auto; /* Change to 'none' if you want to click through to HTML */
    z-index: -1;
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import Matter from 'matter-js';

  let canvasContainer: HTMLDivElement;

  onMount(() => {
    const { Engine, Render, Runner, Bodies, Composite } = Matter;
    // Engine: physics calculations
    // Render: drawing the scene
    // Runner: game loop
    // Bodies: shapes in the world
    // Composite: collection of bodies

    const engine = Engine.create();
    const render = Render.create({
        element: canvasContainer, // Where to put the canvas in your HTML
        engine: engine,           // Which engine to render
        options: { width: 800, height: 600, wireframes: false }
    });

    const box = Bodies.rectangle(400, 200, 80, 80);
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

    Composite.add(engine.world, [box, ground]);
    Render.run(render);
    
    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Engine.clear(engine);
      render.canvas.remove();
    };
  });
</script>

<div bind:this={canvasContainer}></div>
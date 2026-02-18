<script lang="ts">
  import { onMount } from 'svelte';
  import Matter from 'matter-js';

  let canvasContainer: HTMLDivElement;

  onMount(() => {
    const { Engine, Render, Runner, Bodies, Composite, Constraint, MouseConstraint, Mouse } = Matter;

    const engine = Engine.create();
    const render = Render.create({
      element: canvasContainer,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent'
      }
    });

    // Create a "Chain" of nodes representing your studio's services
    const services = ['Web', 'Design', 'Motion', 'Code'];
    const nodes = services.map((_, i) => 
      Bodies.circle(200 + i * 100, 300, 40, { 
        restitution: 0.8,
        render: { fillStyle: '#ffffff' } 
      })
    );

    // Connect them with elastic strings
    for (let i = 0; i < nodes.length - 1; i++) {
      const link = Constraint.create({
        bodyA: nodes[i],
        bodyB: nodes[i + 1],
        stiffness: 0.1,
        length: 120
      });
      Composite.add(engine.world, link);
    }

    // Anchor the first node to a fixed point (The "Coatline")
    const anchor = Constraint.create({
      pointA: { x: window.innerWidth / 2, y: 100 },
      bodyB: nodes[0],
      stiffness: 0.01
    });

    Composite.add(engine.world, [...nodes, anchor]);

    // Enable Mouse interaction
    const mouse = Mouse.create(render.canvas);
    Composite.add(engine.world, MouseConstraint.create(engine, { mouse }));

    Render.run(render);
    Runner.run(Runner.create(), engine);
  });
</script>

<div bind:this={canvasContainer} class="fixed inset-0 z-0"></div>

<style>
  div {
    touch-action: none; /* Prevents scrolling while dragging nodes */
  }
</style>
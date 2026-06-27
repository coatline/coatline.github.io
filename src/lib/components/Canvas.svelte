<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { Physics } from "$lib/physics/Physics";
  import { PhysicsString } from "$lib/physics/PhysicsString";
  import { ParticleSystem } from "$lib/physics/Particles";

  let canvas: HTMLCanvasElement;
  let animationFrame: number;

  const floatingWords = [
    { text: "Unity", x: 0.08, y: 0.15, size: "700 28px Inter, sans-serif", color: "#ff6347" },
    { text: "C#", x: 0.88, y: 0.22, size: "700 24px Inter, sans-serif", color: "#ffffff" },
    { text: "Godot", x: 0.12, y: 0.38, size: "700 20px Inter, sans-serif", color: "#a78bfa" },
    { text: "TypeScript", x: 0.85, y: 0.50, size: "700 22px Inter, sans-serif", color: "#3178c6" },
    { text: "Physics", x: 0.15, y: 0.65, size: "700 18px Inter, sans-serif", color: "#4ecdc4" },
    { text: "GameDev", x: 0.82, y: 0.72, size: "700 26px Inter, sans-serif", color: "#ff6347" },
    { text: "C++", x: 0.06, y: 0.82, size: "700 20px Inter, sans-serif", color: "#659ad2" },
    { text: "Solo Dev", x: 0.9, y: 0.88, size: "700 22px Inter, sans-serif", color: "#f59e0b" },
    { text: "Shaders", x: 0.5, y: 0.12, size: "700 18px Inter, sans-serif", color: "#10b981" },
    { text: "Wishlist", x: 0.5, y: 0.92, size: "700 20px Inter, sans-serif", color: "#ff6347" },
  ];

  onMount(() => {
    if (!browser) return;

    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles.resize(w, h);
    }

    resize();
    window.addEventListener("resize", resize);

    const physics = new Physics();
    const particles = new ParticleSystem(w, h);

    for (const word of floatingWords) {
      const obj = new PhysicsString(
        word.text,
        word.size,
        word.x * w,
        word.y * h,
        physics.world,
        true,
        word.color,
      );
      physics.add(obj);
    }

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      particles.update(ctx, w, h);
      physics.update(ctx);
      animationFrame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrame);
      physics.cleanup();
      window.removeEventListener("resize", resize);
    };
  });
</script>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    background: transparent;
    display: block;
    pointer-events: none;
  }
</style>

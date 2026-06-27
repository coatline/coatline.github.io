<script lang="ts">
  import { onMount } from "svelte";

  interface VideoSrc {
    src: string;
    label?: string;
  }

  let { videos, children }: { videos: VideoSrc[]; children: any } = $props();

  let currentIndex = $state(0);
  let nextIndex = $state(1);
  let isTransitioning = $state(false);
  let videoEls: HTMLVideoElement[] = $state([]);

  const CYCLE_INTERVAL = 5000;

  onMount(() => {
    if (videos.length === 0) return;

    videoEls[0]?.play().catch(() => {});

    const interval = setInterval(() => {
      if (videos.length <= 1) return;
      isTransitioning = true;
      nextIndex = (currentIndex + 1) % videos.length;

      setTimeout(() => {
        videoEls[nextIndex]?.play().catch(() => {});
      }, 100);

      setTimeout(() => {
        currentIndex = nextIndex;
        nextIndex = (currentIndex + 1) % videos.length;
        isTransitioning = false;
      }, 1200);
    }, CYCLE_INTERVAL);

    return () => clearInterval(interval);
  });
</script>

<div class="video-hero">
  {#if videos.length > 0}
    <div class="video-layer active">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <video
        bind:this={videoEls[0]}
        muted
        loop
        playsinline
        autoplay
        class="hero-video"
      >
        <source src={videos[0].src} type="video/mp4" />
      </video>
    </div>
    {#if videos.length > 1}
      <div class="video-layer" class:active={isTransitioning || currentIndex !== 0}>
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <video
          bind:this={videoEls[1]}
          muted
          loop
          playsinline
          class="hero-video"
        >
          <source src={videos[1 % videos.length].src} type="video/mp4" />
        </video>
      </div>
    {/if}
    {#if videos.length > 2}
      <div class="video-layer" class:active={isTransitioning && currentIndex === 1}>
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <video
          bind:this={videoEls[2]}
          muted
          loop
          playsinline
          class="hero-video"
        >
          <source src={videos[2 % videos.length].src} type="video/mp4" />
        </video>
      </div>
    {/if}
  {/if}

  <div class="hero-overlay"></div>
  <div class="hero-gradient"></div>

  <div class="hero-content">
    {@render children()}
  </div>
</div>

<style>
  .video-hero {
    position: relative;
    width: 100%;
    height: 100vh;
    min-height: 600px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .video-layer {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 1.2s ease-in-out;
  }

  .video-layer.active {
    opacity: 1;
  }

  .hero-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(12px) brightness(0.35) saturate(1.3);
    transform: scale(1.15);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 50% 80%,
      transparent 0%,
      rgba(10, 10, 10, 0.6) 60%,
      rgba(10, 10, 10, 0.95) 100%
    );
    z-index: 1;
  }

  .hero-gradient {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(to bottom, transparent, #0a0a0a);
    z-index: 2;
  }

  .hero-content {
    position: relative;
    z-index: 3;
    text-align: center;
    padding: 2rem;
  }
</style>

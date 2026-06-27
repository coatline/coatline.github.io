<script lang="ts">
  import { GameCategory, type Project } from "$lib/data/projects";
  let { projects }: { projects: Project[] } = $props();

  let scrollContainer: HTMLDivElement;
  let activeIndex = $state(0);
  let isDragging = $state(false);
  let startX = $state(0);
  let startScrollLeft = $state(0);
  let videos: HTMLVideoElement[] = $state([]);

  const sideProjects = $derived(
    projects.filter(
      (project) =>
        project.gameCategory === GameCategory.SIDE_PROJECT,
    ),
  );

  function scrollTo(index: number) {
    if (!scrollContainer) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    activeIndex = clamped;
    const slide = scrollContainer.children[clamped] as HTMLElement;
    if (!slide) return;
    const x = slide.offsetLeft - (scrollContainer.offsetWidth - slide.offsetWidth) / 2;
    scrollContainer.scrollLeft = x;
  }

  function updateActiveFromScroll() {
    if (!scrollContainer || !scrollContainer.children[0]) return;
    const first = scrollContainer.children[0] as HTMLElement;
    const slideWidth = first.offsetWidth + 24;
    const raw = scrollContainer.scrollLeft / slideWidth;
    const idx = Math.round(raw);
    if (idx !== activeIndex && idx >= 0 && idx < projects.length) {
      activeIndex = idx;
    }
  }

  function onPointerDown(e: PointerEvent) {
    if (!scrollContainer) return;
    isDragging = true;
    startX = e.clientX;
    startScrollLeft = scrollContainer.scrollLeft;
    scrollContainer.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging || !scrollContainer) return;
    const dx = e.clientX - startX;
    scrollContainer.scrollLeft = startScrollLeft - dx;
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging || !scrollContainer) return;
    isDragging = false;
    scrollContainer.releasePointerCapture(e.pointerId);
    const first = scrollContainer.children[0] as HTMLElement;
    if (!first) return;
    const slideWidth = first.offsetWidth + 24;
    activeIndex = Math.round(scrollContainer.scrollLeft / slideWidth);
  }

  function handleVideoEnter(index: number) {
    videos[index]?.play().catch(() => {});
  }

  function handleVideoLeave(index: number) {
    videos[index]?.pause();
  }
</script>

<div class="carousel-wrapper">
  <div
    class="carousel-track"
    bind:this={scrollContainer}
    onscroll={updateActiveFromScroll}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
    role="region"
    aria-label="Projects carousel"
    class:dragging={isDragging}
  >
    {#each sideProjects as project, i}
      <div
        class="slide"
        class:active={i === activeIndex}
        style="--accent: {project.accentColor || '#ff6347'}"
      >
        <div class="video-bg">
          {#if project.video}
            <video
              bind:this={videos[i]}
              muted
              loop
              playsinline
              preload="metadata"
              onmouseenter={() => handleVideoEnter(i)}
              onmouseleave={() => handleVideoLeave(i)}
              onfocus={() => handleVideoEnter(i)}
              onblur={() => handleVideoLeave(i)}
              class="bg-video"
              poster={project.image}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          {:else if project.image}
            <img src={project.image} alt={project.title} class="bg-image" />
          {:else}
            <div class="bg-gradient" style="--accent: {project.accentColor || '#ff6347'}"></div>
          {/if}
          <div class="video-overlay"></div>
        </div>

        <div class="slide-content">
          <div class="slide-tags">
            {#each project.tags as tag}
              <span class="slide-tag">{tag}</span>
            {/each}
          </div>
          <h3 class="slide-title">{project.title}</h3>
          <p class="slide-description">{project.tag_line}</p>
          {#if project.link}
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              class="slide-link"
            >
              {project.linkLabel || "View Project"} &rarr;
            </a>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <div class="carousel-nav">
    <button
      class="nav-arrow"
      disabled={activeIndex === 0}
      onclick={() => scrollTo(activeIndex - 1)}
      aria-label="Previous project"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>

    <div class="carousel-dots">
      {#each projects as _, i}
        <button
          class="dot"
          class:active={i === activeIndex}
          onclick={() => scrollTo(i)}
          aria-label="Go to project {i + 1}"
        ></button>
      {/each}
    </div>

    <button
      class="nav-arrow"
      disabled={activeIndex === projects.length - 1}
      onclick={() => scrollTo(activeIndex + 1)}
      aria-label="Next project"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  </div>
</div>

<style>
  .carousel-wrapper {
    width: 100%;
    padding: 2rem 0;
  }

  .carousel-track {
    display: flex;
    gap: 24px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 2rem 4rem;
    cursor: grab;
    scrollbar-width: none;
  }

  .carousel-track::-webkit-scrollbar {
    display: none;
  }

  .carousel-track.dragging {
    cursor: grabbing;
    scroll-snap-type: none;
  }

  .slide {
    flex: 0 0 min(85vw, 600px);
    height: 420px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    scroll-snap-align: center;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                box-shadow 0.4s ease;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #111;
  }

  .slide.active {
    transform: scale(1.03);
    box-shadow: 0 0 40px rgba(255, 99, 71, 0.15),
                0 20px 60px rgba(0, 0, 0, 0.5);
  }

  .video-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
  }

  .bg-video,
  .bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(20px) brightness(0.4) saturate(1.2);
    transform: scale(1.15);
  }

  .bg-gradient {
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at 30% 50%,
      color-mix(in srgb, var(--accent) 30%, transparent),
      #0a0a0a 70%
    );
  }

  .video-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.1) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }

  .slide-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    padding: 2.5rem;
  }

  .slide-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  .slide-tag {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 4px 12px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
  }

  .slide-title {
    font-size: 2rem;
    font-weight: 700;
    color: white;
    margin: 0 0 0.75rem;
    line-height: 1.1;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  }

  .slide-description {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    margin: 0 0 1.25rem;
    line-height: 1.6;
    max-width: 480px;
  }

  .slide-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--accent);
    text-decoration: none;
    transition: gap 0.2s ease, color 0.2s ease;
    width: fit-content;
  }

  .slide-link:hover {
    gap: 10px;
    color: white;
  }

  .carousel-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
    position: relative;
    z-index: 60;
  }

  .nav-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
  }

  .nav-arrow:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .nav-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .carousel-dots {
    display: flex;
    gap: 8px;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .dot.active {
    background: #ff6347;
    width: 24px;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    .slide {
      flex: 0 0 85vw;
      height: 360px;
    }

    .carousel-track {
      padding: 1rem 1.5rem;
    }

    .slide-content {
      padding: 1.5rem;
    }

    .slide-title {
      font-size: 1.5rem;
    }
  }
</style>

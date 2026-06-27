<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { GameCategory, type Project } from "$lib/data/projects";

  let { projects }: { projects: Project[] } = $props();

  let scrollContainer: HTMLDivElement;
  let activeIndex = $state(0);
  let isDragging = $state(false);
  let startX = $state(0);
  let startScrollLeft = $state(0);

  const jamProjects = $derived(
    projects.filter(
      (project) => project.gameCategory === GameCategory.GAME_JAM,
    ),
  );

  function scrollTo(index: number) {
    if (!scrollContainer) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    activeIndex = clamped;
    const slide = scrollContainer.children[clamped] as HTMLElement;
    if (!slide) return;
    scrollContainer.scrollLeft = slide.offsetLeft - 12;
  }

  function updateActiveFromScroll() {
    if (!scrollContainer || !scrollContainer.children[0]) return;
    const first = scrollContainer.children[0] as HTMLElement;
    const slideWidth = first.offsetWidth + 16;
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
    const slideWidth = first.offsetWidth + 16;
    activeIndex = Math.round(scrollContainer.scrollLeft / slideWidth);
  }
</script>

<div class="jams-section" use:reveal>
  <div
    class="jams-track"
    role="region"
    aria-label="Game jam projects carousel"
    bind:this={scrollContainer}
    onscroll={updateActiveFromScroll}
    onpointerdown={onPointerDown}
    onpointermove={onPointerMove}
    onpointerup={onPointerUp}
    onpointercancel={onPointerUp}
    class:dragging={isDragging}
  >
    {#each jamProjects as project, i}
      <a
        href={project.link || "#"}
        target={project.link ? "_blank" : undefined}
        rel={project.link ? "noopener noreferrer" : undefined}
        class="jam-card"
        class:active={i === activeIndex}
        style="--accent: {project.accentColor || '#ff6347'}"
      >
        <div class="jam-media">
          {#if project.video}
            <video
              muted
              loop
              playsinline
              preload="metadata"
              class="jam-video"
              onmouseenter={(e) => (e.target as HTMLVideoElement).play()}
              onmouseleave={(e) => (e.target as HTMLVideoElement).pause()}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          {:else if project.image}
            <img src={project.image} alt={project.title} class="jam-image" />
          {:else}
            <div class="jam-gradient"></div>
          {/if}
          <div class="jam-media-overlay"></div>
        </div>

        <div class="jam-info">
          {#if project.game_jam}
            <span class="jam-label">{project.game_jam}</span>
          {/if}
          <h3 class="jam-title">{project.title}</h3>
          <p class="jam-desc">{project.tag_line}</p>
          <div class="jam-footer">
            {#if project.result}
              <span class="jam-result">{project.result}</span>
            {/if}
          </div>
        </div>
      </a>
    {/each}
  </div>

  <div class="jams-nav">
    <button
      class="nav-btn"
      disabled={activeIndex === 0}
      onclick={() => scrollTo(activeIndex - 1)}
      aria-label="Previous"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg
      >
    </button>
    <div class="dots">
      {#each projects as _, i}
        <button
          class="dot"
          class:active={i === activeIndex}
          onclick={() => scrollTo(i)}
          aria-label="Go to {i + 1}"
        ></button>
      {/each}
    </div>
    <button
      class="nav-btn"
      disabled={activeIndex === projects.length - 1}
      onclick={() => scrollTo(activeIndex + 1)}
      aria-label="Next"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"><path d="M9 18l6-6-6-6" /></svg
      >
    </button>
  </div>
</div>

<style>
  .jams-section {
    width: 100%;
  }

  .jams-track {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding: 1rem 0 2rem;
    scrollbar-width: none;
  }

  .jams-track::-webkit-scrollbar {
    display: none;
  }

  .jams-track.dragging {
    scroll-snap-type: none;
  }

  .jam-card {
    flex: 0 0 min(320px, 80vw);
    scroll-snap-align: start;
    border-radius: 16px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
  }

  .jam-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }

  .jam-media {
    position: relative;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background: #111;
  }

  .jam-video,
  .jam-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .jam-gradient {
    width: 100%;
    height: 100%;
    background: radial-gradient(
      ellipse at 30% 50%,
      color-mix(in srgb, var(--accent) 25%, transparent),
      #0a0a0a 70%
    );
  }

  .jam-media-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(10, 10, 10, 0.5));
    pointer-events: none;
  }

  .jam-info {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  .jam-label {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--accent);
  }

  .jam-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: white;
    margin: 0;
  }

  .jam-desc {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.5;
    margin: 0;
    flex: 1;
  }

  .jam-footer {
    display: flex;
    gap: 0.75rem;
    margin-top: 0.25rem;
  }

  .jam-result {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.5);
  }

  .jam-result {
    color: var(--accent);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
  }

  .jams-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.5rem;
    position: relative;
    z-index: 60;
  }

  .nav-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .nav-btn:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.1);
  }

  .nav-btn:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  .dots {
    display: flex;
    gap: 6px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .dot.active {
    background: #ff6347;
    width: 20px;
    border-radius: 3px;
  }
</style>

<script lang="ts">
  import { GameCategory, type Project } from "$lib/data/projects";
  let { projects }: { projects: Project[] } = $props();
  import { reveal } from "$lib/actions/reveal";

  const steamProjects = $derived(
    projects.filter(
      (project) =>
        project.gameCategory === GameCategory.STEAM_RELEASE ||
        project.gameCategory === GameCategory.UPCOMING_STEAM_RELEASE,
    ),
  );
</script>

{#each steamProjects as project}
  <div class="steam" use:reveal>
    <div class="steam-media">
      {#if project.video}
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
        <video
          muted
          loop
          playsinline
          autoplay
          class="steam-video"
          onmouseenter={(e) => (e.target as HTMLVideoElement).play()}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      {:else if project.image}
        <img src={project.image} alt={project.title} class="steam-image" />
      {:else}
        <div
          class="steam-placeholder"
          style="--accent: {project.accentColor || '#ff6347'}"
        >
          <span class="placeholder-icon">🎮</span>
        </div>
      {/if}
      <div class="steam-media-overlay"></div>
    </div>

    <div class="steam-info">
      <div
        class="steam-badge"
        style="--accent: {project.accentColor || '#ff6347'}"
      >
        <span class="badge-dot"></span>
        Latest Release
      </div>
      <h2 class="steam-title">{project.title}</h2>
      <p class="steam-desc">{project.longDescription}</p>

      <div class="steam-meta">
        {#if project.start_date}
          <div class="meta-item">
            <span class="meta-label">Built with</span>
            <span class="meta-value">{project.start_date}</span>
          </div>
        {/if}
        {#if project.release_date}
          <div class="meta-item">
            <span class="meta-label">Dev time</span>
            <span class="meta-value">{project.release_date}</span>
          </div>
        {/if}
      </div>

      {#if project.link}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          class="steam-cta"
          style="--accent: {project.accentColor || '#ff6347'}"
        >
          {project.linkLabel || "Play Now"}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      {/if}
    </div>
  </div>
{/each}

<style>
  .steam {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 3rem;
    align-items: center;
    padding: 3rem 0;
  }

  .steam-media {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 16 / 10;
    background: #111;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .steam-video,
  .steam-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .steam-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(
      ellipse at 30% 50%,
      color-mix(in srgb, var(--accent) 20%, transparent),
      #0a0a0a 70%
    );
  }

  .placeholder-icon {
    font-size: 4rem;
  }

  .steam-media-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 60%, rgba(10, 10, 10, 0.4));
    pointer-events: none;
  }

  .steam-info {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .steam-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: var(--accent);
    width: fit-content;
  }

  .badge-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: dot-pulse 2s ease-in-out infinite;
  }

  @keyframes dot-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  .steam-title {
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 800;
    color: white;
    margin: 0;
    line-height: 1.05;
    letter-spacing: -0.02em;
  }

  .steam-desc {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.55);
    line-height: 1.7;
    margin: 0;
    max-width: 440px;
  }

  .steam-meta {
    display: flex;
    gap: 2rem;
    margin-top: 0.5rem;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .meta-label {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .meta-value {
    font-size: 0.9rem;
    color: white;
    font-weight: 600;
  }

  .steam-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.85rem 2rem;
    border-radius: 12px;
    font-weight: 700;
    font-size: 0.95rem;
    color: white;
    background: var(--accent);
    text-decoration: none;
    transition: all 0.25s ease;
    width: fit-content;
    margin-top: 0.5rem;
  }

  .steam-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px color-mix(in srgb, var(--accent) 40%, transparent);
  }

  @media (max-width: 768px) {
    .steam {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .steam-meta {
      flex-wrap: wrap;
      gap: 1.25rem;
    }
  }
</style>

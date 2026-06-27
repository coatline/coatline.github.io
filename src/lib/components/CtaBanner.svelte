<script lang="ts">
  import { reveal } from "$lib/actions/reveal";

  let { headline, subtext }: { headline: string; subtext: string } = $props();
</script>

<div class="cta-banner" use:reveal>
  <div class="cta-glow"></div>
  <h2 class="cta-headline">{headline}</h2>
  <p class="cta-subtext">{subtext}</p>
  <div class="cta-actions">
    <a
      href="mailto:coatlinestudios@gmail.com"
      class="cta-btn-primary"
    >
      Get In Touch
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
    <a
      href="https://github.com/coatline"
      target="_blank"
      rel="noopener noreferrer"
      class="cta-btn-secondary"
    >
      View GitHub
    </a>
  </div>
</div>

<style>
  .cta-banner {
    position: relative;
    text-align: center;
    padding: 5rem 2rem;
    border-radius: 24px;
    background: rgba(255, 99, 71, 0.04);
    border: 1px solid rgba(255, 99, 71, 0.12);
    overflow: hidden;
    margin: 2rem 0;
  }

  .cta-glow {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 400px;
    height: 200px;
    background: radial-gradient(ellipse, rgba(255, 99, 71, 0.12), transparent 70%);
    pointer-events: none;
  }

  .cta-headline {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    color: white;
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
    position: relative;
  }

  .cta-subtext {
    font-size: 1.05rem;
    color: rgba(255, 255, 255, 0.45);
    margin: 0 0 2rem;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    position: relative;
  }

  .cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  }

  .cta-btn-primary,
  .cta-btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.85rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.95rem;
    text-decoration: none;
    transition: all 0.25s ease;
  }

  .cta-btn-primary {
    background: #ff6347;
    color: white;
  }

  .cta-btn-primary:hover {
    background: #ff7b63;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 99, 71, 0.3);
  }

  .cta-btn-secondary {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .cta-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
</style>

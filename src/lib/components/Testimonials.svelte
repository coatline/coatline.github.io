<script lang="ts">
  import { reveal } from "$lib/actions/reveal";

  interface Testimonial {
    quote: string;
    name: string;
    role: string;
    avatar?: string;
  }

  let { testimonials }: { testimonials: Testimonial[] } = $props();
</script>

<div class="testimonials-grid">
  {#each testimonials as t, i}
    <div class="testimonial-card" use:reveal={{ delay: i * 100 }}>
      <div class="quote-mark">&ldquo;</div>
      <p class="quote-text">{t.quote}</p>
      <div class="quote-author">
        <div class="author-avatar">
          {#if t.avatar}
            <img src={t.avatar} alt={t.name} />
          {:else}
            <span>{t.name.charAt(0)}</span>
          {/if}
        </div>
        <div>
          <div class="author-name">{t.name}</div>
          <div class="author-role">{t.role}</div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.25rem;
  }

  .testimonial-card {
    padding: 2rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    position: relative;
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .quote-mark {
    font-size: 3rem;
    color: #ff6347;
    opacity: 0.3;
    line-height: 1;
    margin-bottom: 0.5rem;
    font-family: Georgia, serif;
  }

  .quote-text {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.7;
    margin: 0 0 1.5rem;
    font-style: italic;
  }

  .quote-author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .author-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 99, 71, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }

  .author-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .author-avatar span {
    font-size: 0.85rem;
    font-weight: 700;
    color: #ff6347;
  }

  .author-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
  }

  .author-role {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.35);
  }
</style>

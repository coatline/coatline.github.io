<script lang="ts">
  import { reveal } from "$lib/actions/reveal";

  interface Stat {
    value: string;
    label: string;
    suffix?: string;
  }

  let { stats }: { stats: Stat[] } = $props();
</script>

<div class="stats-row" use:reveal={{ delay: 100 }}>
  {#each stats as stat, i}
    <div class="stat" style="--delay: {i * 100}ms">
      <span class="stat-value">{stat.value}{stat.suffix || ""}</span>
      <span class="stat-label">{stat.label}</span>
    </div>
  {/each}
</div>

<style>
  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 1.5rem;
    max-width: 800px;
    margin: 0 auto 5rem;
    padding: 2rem;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    justify-items: center;
    text-align: center;
  }

  .stat {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .stat-value {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 800;
    color: #ff6347;
    letter-spacing: -0.02em;
  }

  .stat-label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 500;
  }

  @media (max-width: 600px) {
    .stats-row {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      padding: 1.5rem;
    }
  }
</style>

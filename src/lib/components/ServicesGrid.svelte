<script lang="ts">
  import { reveal } from "$lib/actions/reveal";

  interface Service {
    icon: string;
    title: string;
    description: string;
  }

  let { services }: { services: Service[] } = $props();
</script>

<div class="services-grid">
  {#each services as service, i}
    <div class="service-card" use:reveal={{ delay: i * 80 }}>
      <div class="service-icon">{service.icon}</div>
      <h3 class="service-title">{service.title}</h3>
      <p class="service-desc">{service.description}</p>
    </div>
  {/each}
</div>

<style>
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.25rem;
  }

  .service-card {
    padding: 2rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.3s ease;
  }

  .service-card:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 99, 71, 0.2);
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  .service-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    width: 52px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: rgba(255, 99, 71, 0.08);
  }

  .service-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    margin: 0 0 0.5rem;
  }

  .service-desc {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.6;
    margin: 0;
  }
</style>

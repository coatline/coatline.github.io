<script lang="ts">
  import { reveal } from "$lib/actions/reveal";
  import { type LifeEvent, type LifeEventType } from "$lib/data/content";

  let { entries }: { entries: LifeEvent[] } = $props();

  const statusColors: Record<LifeEventType, string> = {
    "career": "#4caf50",
    "game": "#ffa726",
    "personal": "#42a5f5",
    "achievement": "#42fff5"
  };
</script>

<div class="devlog-timeline">
  {#each entries as entry, i}
    <div class="devlog-entry" use:reveal={{ delay: i * 100 }}>
      <div class="entry-line">
        <div
          class="entry-dot"
          style="background: {statusColors[entry.type]}"
        ></div>
        {#if i < entries.length - 1}
          <div class="entry-connector"></div>
        {/if}
      </div>
      <div class="entry-content">
        <div class="entry-header">
          <span class="entry-date">{entry.date}</span>
          <span
            class="entry-status"
            style="color: {statusColors[entry.type]}; background: {statusColors[entry.type]}15; border-color: {statusColors[entry.type]}30"
          >
            {entry.type}
          </span>
        </div>
        <h3 class="entry-title">{entry.title}</h3>
        <p class="entry-desc">{entry.description}</p>
        {#if entry.tags}
          <div class="entry-tags">
            {#each entry.tags as tag}
              <span class="entry-tag">{tag}</span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  {/each}
</div>

<style>
  .devlog-timeline {
    max-width: 650px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }

  .devlog-entry {
    display: flex;
    gap: 1.25rem;
  }

  .entry-line {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 20px;
  }

  .entry-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 6px;
  }

  .entry-connector {
    width: 1px;
    flex: 1;
    background: rgba(255, 255, 255, 0.08);
    margin-top: 4px;
  }

  .entry-content {
    padding-bottom: 2.5rem;
    flex: 1;
  }

  .entry-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }

  .entry-date {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.35);
    font-weight: 500;
  }

  .entry-status {
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid;
  }

  .entry-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: white;
    margin: 0 0 0.4rem;
  }

  .entry-desc {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.5);
    line-height: 1.6;
    margin: 0 0 0.75rem;
  }

  .entry-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }

  .entry-tag {
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.5);
  }
</style>

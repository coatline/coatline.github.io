<script lang="ts">
  import Canvas from "$lib/components/Canvas.svelte";
  import VideoHero from "$lib/components/VideoHero.svelte";
  import SteamGames from "$lib/components/SteamGames.svelte";
  import GameJams from "$lib/components/GameJams.svelte";
  import SideProjects from "$lib/components/SideProjects.svelte";
  import StatsRow from "$lib/components/StatsRow.svelte";
  import DevLog from "$lib/components/DevLog.svelte";
  import { reveal } from "$lib/actions/reveal";
  import { projects } from "$lib/data/projects";
  import { life, stats, heroVideos } from "$lib/data/content";

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
</script>

<svelte:head>
  <title>Coatline — Solo Game Dev Studio</title>
  <meta
    name="description"
    content="Coatline is the solo game dev studio of Bryler Castleberry. Making games that are fun, weird, and occasionally performant."
  />
</svelte:head>

<div class="canvas-bg"></div>
<Canvas />

<div class="page-wrapper">
  <!-- ==================== HERO ==================== -->
  <VideoHero videos={heroVideos}>
    <div class="hero-text">
      <div class="hero-tag" use:reveal={{ delay: 0 }}>
        <span class="tag-dot"></span>
        Solo Game Dev Studio
      </div>
      <h1 use:reveal={{ delay: 100 }}>Coatline</h1>
      <p class="hero-sub" use:reveal={{ delay: 200 }}>
        I make games. Sometimes they even work.
      </p>
      <div class="hero-ctas" use:reveal={{ delay: 300 }}>
        <button class="cta-primary" onclick={() => scrollToSection("games")}>
          See My Games
        </button>
        <button class="cta-ghost" onclick={() => scrollToSection("jams")}>
          Game Jams
        </button>
      </div>
    </div>
    <div class="scroll-cue" use:reveal={{ delay: 500 }}>
      <div class="scroll-line"></div>
    </div>
  </VideoHero>

  <!-- ==================== STATS ==================== -->
  <section class="stats-section">
    <StatsRow {stats} />
  </section>

  <!-- ==================== STEAM RELEASES ==================== -->
  <section id="games">
    <div class="section-header" use:reveal>
      <span class="section-label">The finished stuff</span>
      <h2>Steam Releases</h2>
      <p class="section-subtitle">
        More to come.
      </p>
    </div>
    <SteamGames projects={projects} />
  </section>

  <!-- ==================== SIDE PROJECTS ==================== -->
  <section id="all-games">
    <div class="section-header" use:reveal>
      <span class="section-label">The Back Catalogue</span>
      <h2>Other Games</h2>
      <p class="section-subtitle">
        Every project teaches me something.
      </p>
    </div>
    <SideProjects projects={projects} />
  </section>

  <!-- ==================== GAME JAMS ==================== -->
  <section id="jams">
    <div class="section-header" use:reveal>
      <span class="section-label">48-Hour Sprints</span>
      <h2>Game Jams</h2>
      <p class="section-subtitle">
        Completed my first game jam in 4th grade.
      </p>
    </div>
    <GameJams projects={projects} />
  </section>

  <!-- ==================== Life LOG ==================== -->
  <section id="devlog">
    <div class="section-header" use:reveal>
      <span class="section-label">Work in Progress</span>
      <h2>Life Log</h2>
      <p class="section-subtitle">
        My life timeline.
      </p>
    </div>
    <DevLog entries={life} />
  </section>

  <!-- ==================== ABOUT ==================== -->
  <section id="about">
    <div class="section-header" use:reveal>
      <span class="section-label">Behind the Code</span>
      <h2>About Me</h2>
    </div>

    <div class="about-content" use:reveal={{ delay: 100 }}>
      <div class="about-text">
        <p>
          I'm <strong>Bryler Castleberry</strong> — a solo game developer who builds
          games that are occasionally fun.
        </p>
        <p>
          I find satisfaction in both good games and scaleable systems.
        </p>
      </div>

      <div class="about-stack">
        <h3>Tech Stack</h3>
        <div class="stack-grid">
          <div class="stack-item">
            <span class="stack-icon">🎮</span>
            <span class="stack-name">Unity</span>
          </div>
          <div class="stack-item">
            <span class="stack-icon">🤖</span>
            <span class="stack-name">Godot</span>
          </div>
          <div class="stack-item">
            <span class="stack-icon">⚡</span>
            <span class="stack-name">C#</span>
          </div>
          <div class="stack-item">
            <span class="stack-icon">🔧</span>
            <span class="stack-name">Python</span>
          </div>
          <div class="stack-item">
            <span class="stack-icon">🧠</span>
            <span class="stack-name">TypeScript</span>
          </div>
          <div class="stack-item">
            <span class="stack-icon">💀</span>
            <span class="stack-name">GDScript</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ==================== CTA ==================== -->
  <section id="contact">
    <div class="cta-banner" use:reveal>
      <div class="cta-glow"></div>
      <h2>Contact me!</h2>
      <p>
        If you have any business inquiries or even just questions, reach out!
      </p>
      <div class="cta-links">
        <a href="mailto:hello@coatline.net" class="cta-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Email Me
        </a>
        <a href="https://coatline.itch.io" target="_blank" rel="noopener noreferrer" class="cta-btn-ghost">
          Itch.io
        </a>
        <a href="https://github.com/coatline" target="_blank" rel="noopener noreferrer" class="cta-btn-ghost">
          GitHub
        </a>
      </div>
    </div>
  </section>

  <!-- ==================== FOOTER ==================== -->
  <footer>
    <div class="footer-content">
      <div class="footer-left">
        <span class="footer-logo">COATLINE</span>
        <span class="footer-copy">&copy; 2026 Bryler Castleberry</span>
      </div>
      <div class="footer-right">
        <a href="https://coatline.itch.io" target="_blank" rel="noopener noreferrer">Itch.io</a>
        <a href="https://github.com/coatline" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com" target="_blank" rel="linkedin.com/in/bryler-castleberry/">LinkedIn</a>
        <a href="mailto:coatlinestudios@gmail.com">Email</a>
      </div>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
    background-color: #0a0a0a;
    color: #e0e0e0;
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    overflow-x: hidden;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .canvas-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a0a0a;
    z-index: -1;
  }

  .page-wrapper {
    position: relative;
    z-index: 10;
    width: 100%;
    background: transparent;
  }

  /* ---- HERO ---- */
  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #ff6347;
  }

  .tag-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff6347;
    animation: dot-pulse 2s ease-in-out infinite;
  }

  @keyframes dot-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  h1 {
    font-size: clamp(4rem, 12vw, 9rem);
    font-weight: 900;
    color: white;
    line-height: 0.9;
    letter-spacing: -0.04em;
    margin: 0;
    text-transform: uppercase;
  }

  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(255, 255, 255, 0.45);
    font-weight: 400;
    margin: 0;
  }

  .hero-ctas {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .cta-primary,
  .cta-ghost {
    padding: 0.85rem 2rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;
    border: none;
    letter-spacing: 0.02em;
  }

  .cta-primary {
    background: #ff6347;
    color: white;
  }

  .cta-primary:hover {
    background: #ff7b63;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(255, 99, 71, 0.3);
  }

  .cta-ghost {
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .cta-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateY(-2px);
  }

  .scroll-cue {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.25), transparent);
    animation: scroll-bounce 2s ease-in-out infinite;
  }

  @keyframes scroll-bounce {
    0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
    50% { opacity: 1; transform: scaleY(1); }
  }

  /* ---- STATS ---- */
  .stats-section {
    padding: 0 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  /* ---- SECTIONS ---- */
  section {
    padding: 6rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-label {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #ff6347;
    display: block;
    margin-bottom: 0.75rem;
  }

  .section-header h2 {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: white;
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
  }

  .section-subtitle {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.4);
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
  }

  /* ---- ABOUT ---- */
  .about-content {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    gap: 4rem;
    align-items: start;
  }

  .about-text {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .about-text p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.7;
    margin: 0;
  }

  .about-text strong {
    color: white;
    font-weight: 600;
  }

  .about-stack h3 {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(255, 255, 255, 0.35);
    margin: 0 0 1rem;
  }

  .stack-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .stack-item {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.2s ease;
  }

  .stack-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 99, 71, 0.2);
  }

  .stack-icon {
    font-size: 1.1rem;
  }

  .stack-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
  }

  /* ---- CTA ---- */
  .cta-banner {
    position: relative;
    text-align: center;
    padding: 5rem 2rem;
    border-radius: 24px;
    background: rgba(255, 99, 71, 0.03);
    border: 1px solid rgba(255, 99, 71, 0.1);
    overflow: hidden;
  }

  .cta-glow {
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 350px;
    height: 180px;
    background: radial-gradient(ellipse, rgba(255, 99, 71, 0.1), transparent 70%);
    pointer-events: none;
  }

  .cta-banner h2 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    font-weight: 800;
    color: white;
    margin: 0 0 0.75rem;
    letter-spacing: -0.02em;
    position: relative;
  }

  .cta-banner p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.4);
    margin: 0 0 2rem;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
    position: relative;
  }

  .cta-links {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    position: relative;
  }

  .cta-btn-primary,
  .cta-btn-ghost {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0.8rem 1.75rem;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.9rem;
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

  .cta-btn-ghost {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.7);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .cta-btn-ghost:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateY(-2px);
  }

  /* ---- FOOTER ---- */
  footer {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 2rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .footer-logo {
    font-size: 0.75rem;
    font-weight: 800;
    color: white;
    letter-spacing: 0.15em;
  }

  .footer-copy {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.25);
  }

  .footer-right {
    display: flex;
    gap: 1.5rem;
  }

  .footer-right a {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .footer-right a:hover {
    color: white;
  }

  @media (max-width: 768px) {
    .about-content {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    section {
      padding: 4rem 1.25rem;
    }
  }

  @media (max-width: 600px) {
    .hero-ctas {
      flex-direction: column;
      width: 100%;
    }

    .cta-primary,
    .cta-ghost {
      width: 100%;
      justify-content: center;
    }

    .footer-content {
      flex-direction: column;
      text-align: center;
    }

    .footer-right {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
</style>

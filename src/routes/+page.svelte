<script lang="ts">
    import Canvas from '$lib/components/Canvas.svelte';
</script>

<svelte:head>
    <title>Bryler Castleberry | Systems & Game Dev</title>
    <meta name="description" content="Portfolio of Bryler Castleberry - Game Developer and Systems Engineer" />
</svelte:head>

<Canvas />

<main>
    <section id="hero">
        <h1 class="physical">Bryler Castleberry</h1>
        <p class="physical">Systems Engineer & Commercial Game Developer</p>
        <div class="cta-group">
            <button class="physical" on:click={() => document.getElementById('projects')?.scrollIntoView()}>View Projects</button>
            <button class="physical" on:click={() => window.open('https://store.steampowered.com/app/YOUR_ID', '_blank')}>Paper Towel Royale on Steam</button>
        </div>
    </section>

    <section id="projects">
        <h2 class="physical">Featured Projects</h2>
        
        <article class="project-card physical">
            <h3>Paper Towel Royale</h3>
            <p>40,000+ lines of C# in Unity. Local multiplayer with deep inheritance systems.</p>
        </article>

        <article class="project-card physical">
            <h3>Rimbox</h3>
            <p>Multithreaded plant and fire simulations with custom A* pathfinding.</p>
        </article>

        <article class="project-card physical">
            <h3>That Kid Life</h3>
            <p>AI research project utilizing Utility-based GOAP in Godot.</p>
        </article>
    </section>

    <section id="experience">
        <h2 class="physical">Experience</h2>
        <div class="work-item physical">
            <strong>Resonance Systems</strong> — Software Engineer (2025-Present)
        </div>
        <div class="work-item physical">
            <strong>Chick-Fil-A</strong> — Professionalism & Teamwork (2023-2025)
        </div>

        <h2 class="physical">Skills</h2>
        <div class="tag-container">
            <span class="tag physical">C#</span>
            <span class="tag physical">C++</span>
            <span class="tag physical">TypeScript</span>
            <span class="tag physical">Assembly (x86)</span>
            <span class="tag physical">Unity</span>
            <span class="tag physical">Godot</span>
        </div>
    </section>

    <section id="community">
        <h2 class="physical">Community & Leadership</h2>
        <p class="physical">Volunteer Drummer | Apologetics Teacher | Beta Club Alumni</p>
        
        <div class="contact-links">
            <button class="physical">GitHub</button>
            <button class="physical">Itch.io</button>
            <button class="physical">LinkedIn</button>
            <button class="physical">Blog</button>
        </div>
    </section>
</main>

<style>
    :global(body) {
        margin: 0;
        background-color: #1a1a1a;
        color: white;
        font-family: 'Inter', sans-serif;
        overflow-x: hidden;
    }

    main {
        position: relative;
        z-index: 10; /* Ensures content stays above canvas background if needed */
        max-width: 900px;
        margin: 0 auto;
        padding: 2rem;
    }

    section {
        min-height: 80vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin-bottom: 5rem;
    }

    .physical {
        display: inline-block; 
        transition: opacity 0.3s;
    }

    h1 { font-size: 4rem; color: #ff6347; margin-bottom: 0; }
    h2 { font-size: 2.5rem; color: #ff6347; margin-top: 3rem; }
    
    .project-card {
        background: #2a2a2a;
        padding: 1.5rem;
        border-radius: 12px;
        margin: 1rem 0;
        width: 100%;
        border: 1px solid #333;
    }

    .tag-container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
    }

    .tag {
        background: #ff6347;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: bold;
    }

    button {
        cursor: pointer;
        background: #ff6347;
        border: none;
        color: white;
        padding: 1rem 2rem;
        font-weight: bold;
        border-radius: 8px;
        margin: 10px;
    }
</style>
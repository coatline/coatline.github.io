<script lang="ts">
  import github from "$lib/images/github.svg";
</script>

<header>
  <a href="/" class="logo">
    <span class="logo-text">COATLINE</span>
  </a>

  <nav>
    <a href="#games">Games</a>
    <a href="#jams">Jams</a>
    <a href="#about">About</a>
    <a href="https://github.com/coatline" target="_blank" rel="noopener noreferrer">
      <img src={github} alt="GitHub" class="gh-icon" />
    </a>
  </nav>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2.5rem;
    backdrop-filter: blur(20px);
    background: rgba(10, 10, 10, 0.6);
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }

  .logo {
    text-decoration: none;
  }

  .logo-text {
    font-size: 0.9rem;
    font-weight: 800;
    color: white;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  nav a {
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.45);
    text-decoration: none;
    transition: color 0.2s ease;
    letter-spacing: 0.04em;
  }

  nav a:hover {
    color: white;
  }

  .gh-icon {
    width: 18px;
    height: 18px;
    filter: invert(1) brightness(0.7);
    transition: filter 0.2s ease;
  }

  nav a:hover .gh-icon {
    filter: invert(1);
  }

  @media (max-width: 600px) {
    header {
      padding: 0.75rem 1.25rem;
    }

    nav {
      gap: 1.25rem;
    }

    nav a {
      font-size: 0.75rem;
    }
  }
</style>

# 🌀 Physics-Based Portfolio

A high-performance, interactive portfolio built with **SvelteKit** and **Matter.js**. This project transforms standard UI elements—text, headers, and buttons—into physical bodies that react to gravity, mouse interaction, and browser scroll events.

## 🚀 The Vision
Unlike static portfolios, this site treats content as physical matter.
* **Scroll-Triggered Gravity:** Elements "fall" and crumble when they are scrolled past the top of the viewport.
* **Elastic Recovery:** Using stiffness constraints, elements "snap" back to their original layout positions when scrolled back into view, creating a clean interpolation effect.
* **Interactive Typography:** Text is rendered via Canvas and mapped to rigid bodies, allowing users to toss, swat, or click elements.

## 🛠️ Tech Stack
* **Framework:** [SvelteKit](https://kit.svelte.dev/)
* **Physics Engine:** [Matter.js](https://brm.io/matter-js/)
* **Language:** TypeScript
* **Rendering:** HTML5 Canvas (managed via Svelte lifecycle)

## 📁 Project Structure
The project uses a clean OOP (Object-Oriented Programming) approach moved from a React architecture into SvelteKit's `$lib` structure.

```text
src/
├── lib/
│   ├── physics/           
│   │   ├── PhysicsObject.ts # Abstract base class for physical entities
│   │   └── PhysicsString.ts # Implementation for text-based physics
│   └── components/        
│       └── PhysicsCanvas.svelte # Lifecycle controller (onMount/onDestroy)
├── routes/
│   ├── +layout.svelte     # Persistent canvas & site-wide styles
│   └── +page.svelte       # Home page content
└── layout.css             # Global styles (custom scrollbars, resets)
import Matter from "matter-js";
import type { PhysicsObject } from "./PhysicsObject";

export class Physics {
  engine: Matter.Engine;
  world: Matter.World;
  objects: PhysicsObject[] = [];
  mousePos: { x: number; y: number } = { x: 0, y: 0 };
  private scrollHandler: () => void;
  private mouseHandler: (e: MouseEvent) => void;
  private rafId: number = 0;

  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.engine.gravity.y = 1.8;

    this.scrollHandler = this.handleScroll.bind(this);
    this.mouseHandler = (e: MouseEvent) => {
      this.mousePos = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("scroll", this.scrollHandler, { passive: true });
    window.addEventListener("mousemove", this.mouseHandler, { passive: true });
    this.handleScroll();

    this.createBounds();
  }

  add(obj: PhysicsObject) {
    this.objects.push(obj);
  }

  remove(obj: PhysicsObject) {
    obj.destroy(this.world);
    this.objects = this.objects.filter((o) => o !== obj);
  }

  update(ctx: CanvasRenderingContext2D) {
    Matter.Engine.update(this.engine, 1000 / 60);

    const hovered = Matter.Query.point(
      this.objects.map((o) => o.body),
      this.mousePos,
    );
    let anyHovered = false;

    for (const obj of this.objects) {
      if (obj.destroyed) continue;
      const isHovered = hovered.includes(obj.body);
      obj.updateHovered(isHovered);
      obj.update(ctx);
      if (isHovered) anyHovered = true;
    }

    document.body.style.cursor = anyHovered ? "pointer" : "default";
  }

  private handleScroll() {
    const scrollY = window.scrollY;
    for (const obj of this.objects) {
      if (!obj.destroyed) obj.updateScroll(scrollY);
    }
  }

  private createBounds() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const ground = Matter.Bodies.rectangle(w / 2, h + 50, w * 3, 100, {
      isStatic: true,
    });
    const ceiling = Matter.Bodies.rectangle(w / 2, -600, w * 3, 100, {
      isStatic: true,
    });
    const leftWall = Matter.Bodies.rectangle(-50, h / 2, 100, h * 5, {
      isStatic: true,
    });
    const rightWall = Matter.Bodies.rectangle(w + 50, h / 2, 100, h * 5, {
      isStatic: true,
    });

    Matter.World.add(this.world, [ground, ceiling, leftWall, rightWall]);
  }

  cleanup() {
    window.removeEventListener("scroll", this.scrollHandler);
    window.removeEventListener("mousemove", this.mouseHandler);
    cancelAnimationFrame(this.rafId);
    Matter.World.clear(this.world, false);
    Matter.Engine.clear(this.engine);
  }
}

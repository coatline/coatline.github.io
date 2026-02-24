import Matter from "matter-js";
import type { PhysicsObject } from "./PhysicsObject";

export class Physics {
  engine: Matter.Engine;
  world: Matter.World;
  objects: PhysicsObject[] = [];
  mousePos: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.engine.gravity.y = 2;

    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", (e) => {
        this.mousePos = { x: e.clientX, y: e.clientY };
      });
    }

    this.createBounds();
  }

  add(obj: PhysicsObject) {
    this.objects.push(obj);
  }

  update(ctx: CanvasRenderingContext2D) {
    Matter.Engine.update(this.engine, 1000 / 60);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const hovered = Matter.Query.point(this.objects.map(o => o.body), this.mousePos);
    let anyHovered = false;

    this.objects.forEach((obj) => {
      const isHovered = hovered.includes(obj.body);
      obj.updateHovered(isHovered);
      obj.update(ctx);

      if(isHovered)
        anyHovered = true;
    });

    document.body.style.cursor = anyHovered ? 'pointer' : 'default';
  }

  private handleScroll() {
    const scrollY = window.scrollY;

    this.objects.forEach((obj) => {
      obj.updateScroll(scrollY);
    });
  }

  private createBounds() {
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 50,
      window.innerWidth * 2,
      100,
      { isStatic: true },
    );

    const ceiling = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      -500,
      window.innerWidth * 2,
      100,
      { isStatic: true },
    );

    const leftWall = Matter.Bodies.rectangle(
      -50,
      window.innerHeight / 2,
      100,
      window.innerHeight * 5,
      { isStatic: true },
    );

    const rightWall = Matter.Bodies.rectangle(
      window.innerWidth + 50,
      window.innerHeight / 2,
      100,
      window.innerHeight * 5,
      { isStatic: true },
    );

    Matter.World.add(this.world, [ground, ceiling, leftWall, rightWall]);
  }

  cleanup() {
    window.removeEventListener("scroll", this.handleScroll);
    Matter.World.clear(this.world, false);
    Matter.Engine.clear(this.engine);
  }
}

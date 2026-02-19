import Matter from "matter-js";
import type { PhysicsObject } from "./PhysicsObject";

export class Physics {
  engine: Matter.Engine;
  world: Matter.World;
  objects: PhysicsObject[] = [];

  constructor() {
    this.engine = Matter.Engine.create();
    this.world = this.engine.world;
    this.engine.gravity.y = 1;
    
    this.handleScroll = this.handleScroll.bind(this);
    window.addEventListener("scroll", this.handleScroll);
    this.createGround();
  }

  add(obj: PhysicsObject) {
    this.objects.push(obj);
  }

  update(ctx: CanvasRenderingContext2D) {
    Matter.Engine.update(this.engine, 1000 / 60);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.objects.forEach((obj) => obj.update(ctx));
  }

  private handleScroll() {
    const scrollY = window.scrollY;

      this.objects.forEach((obj) => {
        obj.updateAnchor(scrollY);
      });
  }

  private createGround() {
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight + 50,
      window.innerWidth * 2,
      100,
      { isStatic: true }
    );
    Matter.World.add(this.world, ground);
  }

  cleanup() {
    window.removeEventListener("scroll", this.handleScroll);
    Matter.World.clear(this.world, false);
    Matter.Engine.clear(this.engine);
  }
}

import Matter from "matter-js";
import {PhysicsObject} from "./PhysicsObject"

export class PhysicsString extends PhysicsObject {
  str: string;

  constructor(
    str: string,
    x: number,
    y: number,
    world: Matter.World,
    color = "#ff6347"
  ) {
    super(color);
    this.str = str;
    this.createBody(x, y, world);
    Matter.Body.setVelocity(this.body, { x: (Math.random() * 2 - 1), y: -5 });
    console.log(`Created physics object at ${x} ${y} with string: ${str}`);
  }

  createBody(x: number, y: number, world: Matter.World) {
    this.body = Matter.Bodies.rectangle(x, y, 30, 30, {
      restitution: 0.9,
      friction: 0.1,
    });
    Matter.World.add(world, this.body);
  }

  updateVisuals(ctx: CanvasRenderingContext2D) {
    const { position, angle } = this.body;
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);
    ctx.fillStyle = this.color;
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.str, 0, 0);
    ctx.restore();
  }
}

import Matter from "matter-js";
import { PhysicsObject } from "./PhysicsObject";

export class PhysicsString extends PhysicsObject {
  str: string;
  font: string;

  constructor(
    str: string,
    font: string,
    x: number,
    y: number,
    world: Matter.World,
    isSleeping: boolean = false,
    color = "#ff6347",
  ) {
    super(x, y, world, isSleeping, color);
    this.str = str;
    this.font = font;
    this.body = this.createBody(x, y, world);
    this.anchor = this.createAnchor(x, y, world);
    // console.log(`Created physics object at ${x} ${y} with string: ${str}`);
  }

  createBody(x: number, y: number, world: Matter.World): Matter.Body {
    const size = this.measureTextSize(this.str, this.font);

    let body = Matter.Bodies.rectangle(x, y, size.width + 8, size.height + 8, {
      restitution: 0.95,
      friction: 0.1,
      isSleeping: this.isSleeping,
    });

    Matter.World.add(world, body);
    return body;
  }

  update(ctx: CanvasRenderingContext2D) {
    const { position, angle } = this.body;
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.str, 0, 0);
    ctx.restore();
  }

  measureTextSize(text: string, font = "40px Arial") {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.font = font;
    const metrics = ctx.measureText(text);
    const width = metrics.width;
    const height =
      metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return { width: width * 0.75, height: height * 0.7 };
  }

  mouseExited(mousePos: { x: number; y: number }): void {}

  mouseEntered(mousePos: { x: number; y: number }): void {
    this.body.isSleeping = false;
  }

  mouseClickedOn(mousePos: { x: number; y: number }): void {
    this.body.isSleeping = false;
    Matter.Body.applyForce(this.body, this.body.position, {
      x: 0,
      y: -0.05 * this.body.mass,
    });
  }
}

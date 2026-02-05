import Matter from "matter-js";
import {PhysicsObject} from "./PhysicsObject"

export class PhysicsString extends PhysicsObject {
  str: string;
  font: string;
  isSleeping: boolean;

  constructor(
    str: string,
    x: number,
    y: number,
    world: Matter.World,
    isSleeping: boolean = false,
    crumble: boolean = false,
    color = "#ff6347"
  ) {
    super(color);
    this.str = str;
    this.font = "24px Arial";
    this.isSleeping = isSleeping;
    this.createBody(x, y, world);
    // console.log(`Created physics object at ${x} ${y} with string: ${str}`);
  }

  createBody(x: number, y: number, world: Matter.World): void {
    const size = this.measureTextSize(this.str, this.font);
    this.body = Matter.Bodies.rectangle(x, y, size.width, size.height, {
      restitution: 0.9,
      friction: 0.1,
      isSleeping: this.isSleeping,
    });
    Matter.World.add(world, this.body);
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
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return { width: width * 0.75, height: height * 0.7 };
  }

  mouseExited(mousePos: { x: number; y: number; }): void {
  }

  mouseEntered(mousePos: { x: number; y: number; }): void {
    this.body.isSleeping = false;
  }

  mouseClickedOn(mousePos: { x: number; y: number; }): void {
    this.body.isSleeping = false;
    Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.05 * this.body.mass });
  }
}

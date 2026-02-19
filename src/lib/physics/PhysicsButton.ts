import Matter from "matter-js";
import { PhysicsObject } from "./PhysicsObject";

export class PhysicsButton extends PhysicsObject {
  str: string;
  font: string;
  width: number;
  height: number;
  padding: number;
  text_color: string;
  borderRadius: number;

  constructor(
    str: string,
    font: string,
    x: number,
    y: number,
    width: number,
    height: number,
    world: Matter.World,
    color = "#ff6347",
    text_color = "#ffffff"
  ) {
    super(color);
    this.str = str;
    this.font = font;
    this.width = width;
    this.height = height;
    this.padding = 10;
    this.borderRadius = 8;
    this.text_color = text_color;
    this.createBody(x, y, world);
  }

  createBody(x: number, y: number, world: Matter.World): void {
    this.body = Matter.Bodies.rectangle(x, y, this.width, this.height, {
      restitution: 0.5,
      friction: 0.1,
      chamfer: { radius: this.borderRadius } // Rounds the physics corners
    });
    Matter.World.add(world, this.body);
  }

  update(ctx: CanvasRenderingContext2D) {
    const { position, angle } = this.body;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);

    // 1. Draw the Button Body (The Box)
    ctx.fillStyle = this.color;
    this.drawRoundedRect(ctx, -this.width / 2, -this.height / 2, this.width, this.height, this.borderRadius);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.str, 0, 0);

    ctx.restore();
  }

  // Helper to draw the button shape with rounded corners
  private drawRoundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  mouseExited(mousePos: { x: number; y: number }): void {}

  mouseEntered(mousePos: { x: number; y: number }): void {
    this.body.isSleeping = false;
  }

  mouseClickedOn(mousePos: { x: number; y: number }): void {
    this.body.isSleeping = false;
    // Standard button "pop" when clicked
    Matter.Body.applyForce(this.body, this.body.position, { x: 0, y: -0.05 * this.body.mass });
    console.log(`Button "${this.str}" clicked!`);
  }
}
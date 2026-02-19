import Matter from "matter-js";

export abstract class PhysicsObject {
  body!: Matter.Body;
  color: string;

  constructor(color: string) {
    this.color = color;
  }

  abstract createBody(x: number, y: number, world: Matter.World): void;
  abstract mouseExited(mousePos: {x: number, y: number}): void;
  abstract mouseEntered(mousePos: {x: number, y: number}): void;
  abstract mouseClickedOn(mousePos: {x: number, y: number}): void;

  update(ctx: CanvasRenderingContext2D) {
    const { position, angle } = this.body;

    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.rotate(angle);
    ctx.fillStyle = this.color;
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", 0, 0);
    ctx.restore();
  }
}

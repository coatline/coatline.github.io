import Matter from "matter-js";

export abstract class PhysicsObject {
  anchor!: Matter.Constraint;
  body!: Matter.Body;
  isSleeping: boolean;
  initialY: number;
  color: string;

  constructor(
    x: number,
    y: number,
    world: Matter.World,
    isSleeping: boolean,
    color: string,
  ) {
    this.initialY = y + window.scrollY;
    this.isSleeping = isSleeping;
    this.color = color;
  }

  abstract createBody(x: number, y: number, world: Matter.World): Matter.Body;

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

  updateScroll(currentScrollY: number) {
    const targetY = this.initialY - currentScrollY;

    if (this.body.isSleeping) {
        Matter.Body.setPosition(this.body, {
            x: this.body.position.x,
            y: targetY
        });
        
        Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    }

    if (this.body.isSleeping && targetY < window.innerHeight / 2) {
        this.body.isSleeping = false;
        
        Matter.Body.applyForce(this.body, this.body.position, { 
            x: (Math.random() - 0.5) * 0.05, 
            y: 0.01 
        });
    }
  }
}

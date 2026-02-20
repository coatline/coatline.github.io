import Matter from "matter-js";

export abstract class PhysicsObject {
  anchor!: Matter.Constraint;
  body!: Matter.Body;
  isSleeping: boolean;
  initialY: number;
  color: string;
  isFallen: boolean = false;

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

  protected createAnchor(
    x: number,
    y: number,
    world: Matter.World,
  ): Matter.Constraint {
    let anchor = Matter.Constraint.create({
      pointA: { x, y },
      bodyB: this.body,
      stiffness: 1.0,
      damping: 0.1,
      length: 0,
    });

    Matter.World.add(world, anchor);
    return anchor;
  }

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

  updateAnchor(currentScrollY: number) {
    if (this.isFallen) return;

    const targetY = this.initialY - currentScrollY;

    console.log(`Anchor Y: ${this.anchor.pointA.y}, Target Y: ${targetY}, Body Max Y: ${this.body.bounds.max.y}`);
    this.anchor.pointA.y = targetY;

    if (targetY < window.innerHeight / 2) {
      this.isFallen = true;
      this.body.isSleeping = false;
      this.anchor.stiffness = 0;
      this.anchor.damping = 0;
      
      Matter.Body.applyForce(this.body, this.body.position, { 
        x: (Math.random() - 0.5) * 0.1, 
        y: 0.01 
      });
    }
  }
}

import Matter from "matter-js";

export abstract class PhysicsObject {
  isHovered: boolean = false;
  body!: Matter.Body;
  isSleeping: boolean;
  initialX: number;
  initialY: number;
  color: string;
  destroyed: boolean = false;

  constructor(
    x: number,
    y: number,
    world: Matter.World,
    isSleeping: boolean,
    color: string,
  ) {
    this.initialY = y + window.scrollY;
    this.initialX = x;
    this.isSleeping = isSleeping;
    this.color = color;
  }

  abstract createBody(x: number, y: number, world: Matter.World): Matter.Body;

  update(ctx: CanvasRenderingContext2D) {
    if (this.destroyed) return;

    const { position, angle } = this.body;

    if (this.body.isSleeping) {
      const targetY = this.initialY - window.scrollY;
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x,
        y: targetY,
      });
      Matter.Body.setAngle(this.body, 0);
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    }

    this.draw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    const visualY = this.body.position.y;

    ctx.translate(this.body.position.x, visualY);
    ctx.rotate(this.body.angle);

    this.displayHoverEffect(ctx);

    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", 0, 0);
    ctx.restore();
  }

  protected displayHoverEffect(ctx: CanvasRenderingContext2D) {
    if (this.isHovered) {
      ctx.strokeStyle = "white";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 20;
      ctx.shadowColor = this.color;
    }
  }

  updateHovered(isHovered: boolean) {
    this.isHovered = isHovered;
  }

  updateScroll(currentScrollY: number) {
    const targetY = this.initialY - currentScrollY;

    if (this.body.isSleeping) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x,
        y: targetY,
      });
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    }

    if (targetY < window.innerHeight * 0.15 && this.body.isSleeping) {
      this.body.isSleeping = false;

      Matter.Body.applyForce(this.body, this.body.position, {
        x: (Math.random() - 0.5) * 0.04,
        y: 0.008 + Math.random() * 0.005,
      });
    }
  }

  destroy(world: Matter.World) {
    this.destroyed = true;
    Matter.World.remove(world, this.body);
  }
}

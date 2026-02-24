import Matter from "matter-js";

export abstract class PhysicsObject {
  anchor!: Matter.Constraint;
  isHovered: boolean = false;
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

    this.displayHoverEffect(ctx);

    ctx.fillStyle = this.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", 0, 0);
    ctx.restore();
  }

  protected displayHoverEffect(ctx: CanvasRenderingContext2D) {
    if (this.isHovered) {
        console.log("Hovered:", this);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 4;
        
        ctx.shadowBlur = 25;
        ctx.shadowColor = this.color;
    }
  }

  updateHovered(isHovered: boolean) {
    this.isHovered = isHovered;

    if (isHovered) {
    } else {
    }
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

    if (this.body.isSleeping && targetY < window.innerHeight / 2) {
      this.body.isSleeping = false;

      Matter.Body.applyForce(this.body, this.body.position, {
        x: (Math.random() - 0.5) * 0.05,
        y: 0.01,
      });
    }
  }
}

import Matter from "matter-js";

export abstract class PhysicsObject {
  anchor!: Matter.Constraint;
  isHovered: boolean = false;
  body!: Matter.Body;
  isSleeping: boolean;
  initialX: number;
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
    this.initialX = x;
    this.isSleeping = isSleeping;
    this.color = color;
  }

  abstract createBody(x: number, y: number, world: Matter.World): Matter.Body;

  update(ctx: CanvasRenderingContext2D) {
    const { position, angle } = this.body;
    
    const targetY = this.initialY - window.scrollY;
    
    if (targetY > window.innerHeight / 2) {
      let lerpFactor = 0.05;

      let newX = this.body.position.x + (this.initialX - this.body.position.x) * lerpFactor;
      let newY = this.body.position.y + (this.initialY - this.body.position.y) * lerpFactor;

      Matter.Body.setPosition(this.body, { x: newX, y: newY });
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    }
    
    this.draw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D){
    ctx.save();
    ctx.translate(this.body.position.x, this.body.position.y);
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

    // If we are stuck, simulate scrolling down the webpage
    if (this.body.isSleeping) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x,
        y: targetY,
      });

      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    }

    if (targetY < window.innerHeight / 2) {
      if(this.body.isSleeping == false) return;
      this.body.isSleeping = false;

      Matter.Body.applyForce(this.body, this.body.position, {
        x: (Math.random() - 0.5) * 0.05,
        y: 0.01,
      });
    }
  }
}

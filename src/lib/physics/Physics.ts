import Matter from "matter-js";
import type { PhysicsObject } from "./PhysicsObject";

export class Physics {
    engine: Matter.Engine;
    world: Matter.World;
    objects: PhysicsObject[] = [];

    constructor() {
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.engine.gravity.y = 1;
    }

    add(obj: PhysicsObject) {
        this.objects.push(obj);
    }

    update(ctx: CanvasRenderingContext2D) {
        Matter.Engine.update(this.engine, 1000 / 60);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.objects.forEach(obj => obj.update(ctx));
    }

    cleanup() {
        Matter.World.clear(this.world, false);
        Matter.Engine.clear(this.engine);
    }
}
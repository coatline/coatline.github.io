import React, { useEffect, useRef } from "react";
import { PhysicsString } from "./PhysicsString"
import { PhysicsObject } from "./PhysicsObject";
import Matter from "matter-js";

const LETTERS = "Coatline";


// TODO: Make bubbles that when you click on them they pop and show text
// TODO: Make it to where you can type and the letters fall down as physics objects when you are finished typing
const PhysicsLetters: React.FC = () => {

  function AddPhysicsObject(obj: PhysicsObject, velocity?: {x: number, y: number}) {
    if (velocity) {
      Matter.Body.setVelocity(obj.body, velocity);
    }

    physicsObjects.push(obj);
  }

  const mouse = { x: 0, y: 0 }
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const physicsObjects: PhysicsObject[] = [];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    const engine = Matter.Engine.create();
    const renderer = Matter.Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: "transparent",
      },
    });
    
    const world = engine.world;
    engineRef.current = engine;
    engine.gravity.y = 1;
    
    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
  );

  canvas.addEventListener("mousedown", () => {
    for (const obj of physicsObjects) {
      const body = obj.body;
      const isInside =
        Matter.Bounds.contains(body.bounds, mouse) &&
        Matter.Vertices.contains(body.vertices, mouse);
        
      if (isInside) {
        obj.mouseClickedOn(mouse);
      }
    }
  });

  Matter.Events.on(engine, 'collisionStart', (event) => {
    // const bg = document.getElementById('bg-canvas-layer');
    // bg.style.backgroundColor = '#1a1a2e';
    // setTimeout(() => {
    //   bg.style.backgroundColor = '#0a0a0a';
    // }, 100);
  });

    const ground = Matter.Bodies.rectangle(width / 2, height - 30 - Math.random() * 5, width, 60, {
      isStatic: true,
    });

    Matter.World.add(world, ground);

    for(let i = 0; i < LETTERS.length; i++) {
      const letter = LETTERS[i];
      AddPhysicsObject(new PhysicsString(letter, "24px Arial", 100 + i * 20, 50, world, true, false, "rgb(0, 255, 110)"));
    }

    AddPhysicsObject(new PhysicsString("Coatline", "204px Arial", width / 2, height / 3, world, false, false, "rgb(255, 204, 0)"));
    AddPhysicsObject(new PhysicsString("Start!", "52px Arial", width / 2, height / 2, world, true, false, "#0099ffff"));

    Matter.Runner.run(engine);
    
    const renderLoop = () => {
      Matter.Engine.update(engine, 15);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, height - 60, width, 60);

      physicsObjects.forEach((obj: PhysicsObject) => {
        const body = obj.body;
        const isInside = Matter.Bounds.contains(body.bounds, mouse) && Matter.Vertices.contains(body.vertices, mouse);

        if (isInside)
          obj.mouseEntered(mouse);

        obj.update(ctx);
      });

      requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
    };
  });

  return (
  <div className="physics-container">
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="physics-canvas"
    />
  </div>
);
};

export default PhysicsLetters;

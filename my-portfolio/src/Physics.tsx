import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { PhysicsString } from "./PhysicsString"
import { PhysicsObject } from "./PhysicsObject";

const LETTERS = "Coatline";


// TODO: Make bubbles that when you click on them they pop and show text
const PhysicsLetters: React.FC = () => {

  function CreatePhysicsString(str: string,
    x: number,
    y: number,
    world: Matter.World,
    color = "#0099ffff"): PhysicsString {
    const newString = new PhysicsString(str, x, y, world, color);
    bodies.push(newString);
    console.log(bodies.length);
    return newString;
  }

  const mouse = { x: 0, y: 0 }
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodies: PhysicsObject[] = [];

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;
    engine.gravity.y = 1;
    
    canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  canvas.addEventListener("mousedown", () => {
    for (const obj of bodies) {
      const body = obj.body;
      const isInside =
        Matter.Bounds.contains(body.bounds, mouse) &&
        Matter.Vertices.contains(body.vertices, mouse);

      if (isInside) {
        Matter.Body.applyForce(body, body.position, { x: 0, y: -0.15 });
        break;
      }
    }
  });

    const ground = Matter.Bodies.rectangle(width / 2, height - 30 - Math.random() * 5, width, 60, {
      isStatic: true,
    });

    const mouseCursor = Matter.Bodies.circle(mouse.x, mouse.y, 5, {
      isStatic: false,
    });

    Matter.World.add(world, ground);
    Matter.World.add(world, mouseCursor);

    for(let i = 0; i < LETTERS.length; i++) {
      const letter = LETTERS[i];
      CreatePhysicsString(letter, 100 + i * 20, 50, world, "#0099ffff");
    }

    CreatePhysicsString("Coatline", canvas.width/2, 50, world, "#0099ffff");

    Matter.Runner.run(engine);
    
    const renderLoop = () => {
      Matter.Engine.update(engine, 15);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#555";
      ctx.fillRect(0, height - 60, width, 60);

      mouseCursor.position = mouse;

      bodies.forEach((obj: PhysicsObject) => {
        obj.updateVisuals(ctx);
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
      width={800}
      height={600}
      className="physics-canvas"
    />
    <div className="letters-overlay">
      {LETTERS.split("").map((letter, idx) => (
        <span
          key={idx}
          onMouseEnter={(e) => {
            console.log(`ENTERED! ${engineRef.current}`);
            if (!engineRef.current) return;

            const rect = (e.target as HTMLElement).getBoundingClientRect();
            const parentRect = canvasRef.current!.getBoundingClientRect();
            const x = rect.left - parentRect.left + rect.width / 2;
            const y = rect.top - parentRect.top + rect.height / 2;

            CreatePhysicsString(letter, x, y, engineRef.current.world, "#0099ffff");
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  </div>
);
};

export default PhysicsLetters;

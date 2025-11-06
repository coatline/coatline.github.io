import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { PhysicsString } from "./PhysicsString"
import { PhysicsObject } from "./PhysicsObject";

const LETTERS = "MINECRAFT";


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

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodies: PhysicsObject[] = [];

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current == false){
      initialized.current = true;
      return;
    }
  
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;
    engine.gravity.y = 1;
    
    const ground = Matter.Bodies.rectangle(width / 2, height - 30, width, 60, {
      isStatic: true,
    });

    Matter.World.add(world, ground);
    
    for(let i = 0; i < LETTERS.length; i++) {
      const letter = LETTERS[i];
      CreatePhysicsString(letter, 100 + i * 60, 50, world, "#0099ffff");
    }

    CreatePhysicsString("Coatline", 50, 50, world, "#0099ffff");

    Matter.Runner.run(engine);
    
    const renderLoop = () => {
      Matter.Engine.update(engine, 15);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#555";
      ctx.fillRect(0, height - 60, width, 60);

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

import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import { PhysicsString } from "./PhysicsString"

const LETTERS = "MINECRAFT";

const PhysicsLetters: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    const engine = Matter.Engine.create();
    const world = engine.world;
    engineRef.current = engine;
    engine.world.gravity.y = 5000;
    
    const bodies: PhysicsObject[] = [];
    const ground = Matter.Bodies.rectangle(width / 2, height - 30, width, 60, {
      isStatic: true,
    });
    Matter.World.add(world, ground);
    
    const newString = new PhysicsString("Johnny!", 50, 50, world, "#0099ffff");
    bodies.push(newString);

    Matter.Engine.run(engine);
    
    const renderLoop = () => {
      Matter.Engine.update(engine, 0.1);
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
      Matter.World.clear(world);
      Matter.Engine.clear(engine);
    };
  }, []);

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

            const newLetter = new PhysicsString(letter, x, y, engineRef.current.world, "#348329");
            bodies.push(newLetter);
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

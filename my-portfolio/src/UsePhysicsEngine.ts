import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { PhysicsObject } from "./PhysicsObject";

export const UsePhysicsEngine = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const engineRef = useRef(Matter.Engine.create());
  const runnerRef = useRef(Matter.Runner.create());
  const objectsRef = useRef<PhysicsObject[]>([]);
  const requestRef = useRef<number>(0);

  const addPowerUp = (obj: PhysicsObject) => {
    // Matter.World.add(engineRef.current.world, obj.body);
    objectsRef.current.push(obj);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const engine = engineRef.current;

    const update = () => {
      Matter.Engine.update(engine, 1000 / 60);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      objectsRef.current.forEach((obj) => obj.update(ctx));

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(requestRef.current);
      Matter.Engine.clear(engine);
      Matter.World.clear(engine.world, false);
      Matter.Runner.stop(runnerRef.current);
    };
  }, [canvasRef]);

  return { addPowerUp, objects: objectsRef.current };
};
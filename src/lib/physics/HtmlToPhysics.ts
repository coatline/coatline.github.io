import { PhysicsString } from "./PhysicsString";
import { Physics } from "./Physics";

export class HtmlToPhysics {
  physics: Physics;

  constructor(physics: Physics) {
    this.physics = physics;
  }

  initialize() {
    // 1. Grab all elements with the class
    const elements = document.querySelectorAll(".physical");
    elements.forEach((el) => {this.convertToPhysics(el as HTMLElement)});
  }

  convertToPhysics(element: HTMLElement) {
    // 2. Get the exact coordinates and size
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const text = element.textContent || "";
    const style = window.getComputedStyle(element);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    console.log(style.color);

    const obj = new PhysicsString(
      text,
      font,
      x,
      y + window.scrollY, // Add scroll because BoundingRect is relative to viewport
      this.physics.world,
      true, // Start sleeping
      false,
      style.color,
    );

    this.physics.add(obj);

    // 4. Hide the original HTML so it doesn't double up
    (element as HTMLElement).style.opacity = "0";
  }
}

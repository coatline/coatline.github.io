import { PhysicsString } from "./PhysicsString";
import { PhysicsObject } from "./PhysicsObject";
import {PhysicsButton} from "./PhysicsButton"
import { Physics } from "./Physics";

export class HtmlToPhysics {
  physics: Physics;

  constructor(physics: Physics) {
    this.physics = physics;
  }

  initialize() {
    const elements = document.querySelectorAll(".physical");
    elements.forEach((el) => {
      this.convertToPhysics(el as HTMLElement);
    });
  }

  convertToPhysics(element: HTMLElement) {
    if (element.dataset.physics === "processed") return;

    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const text = element.textContent || "";
    const style = window.getComputedStyle(element);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

    let obj: PhysicsObject;

    if (element.tagName === "BUTTON") {
      obj = new PhysicsButton(
        text,
        font,
        x,
        y,
        rect.width,
        rect.height,
        this.physics.world,
        true,
        style.backgroundColor,
        style.color
      );
    } else {
      obj = new PhysicsString(
        text,
        font,
        x,
        y,
        this.physics.world,
        true,
        style.color,
      );
    }

    if (obj) {
      this.physics.add(obj);
      element.dataset.physics = "processed";
      element.style.opacity = "0";
      element.style.pointerEvents = "none"; // Stop HTML from blocking canvas clicks
    }
  }
}

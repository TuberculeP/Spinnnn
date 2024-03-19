import Scene from "../canvas2d/Scene";
import { Arc, RotatingArc } from "../canvas2d/shapes/arc";
import { deg2rad } from "../utils/helpers";

export default class Scenario1 extends Scene {
  private rotatingArcs: RotatingArc[] = [];
  private arcs: Arc[] = [];
  constructor(id?: string) {
    super(id);

    if (!this.context) return;
    this.params["line-width"] = 6;
    this.params["color"] = [255, 255, 255, 1];
    this.params["speed"] = 2;
    this.debugFolder?.add(this.params, "line-width", 1, 10);
    this.debugFolder?.addColor(this.params, "color");
    this.debugFolder?.add(this.params, "speed", -50, 50);
    this.context.lineWidth = this.params["line-width"];
    this.context.fillStyle = "white";
    this.context.strokeStyle = "white";
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.font = "20px Arial";
    this.context.save();
    for (let i = 0; i < 20; i++) {
      this.rotatingArcs.push(
        new RotatingArc(
          this.width / 2,
          this.height / 2,
          100 + i * 5,
          deg2rad(-135 + (i % 2 ? 0 : 180)),
          deg2rad(-45 + (i % 2 ? 0 : 180))
        )
      );
    }
    this.arcs.push(
      new Arc(this.width / 2, this.height / 2, 90),
      new Arc(this.width / 2, this.height / 2, 210)
    );
  }
  update() {
    if (!this.context) return;
    this.context.clearRect(0, 0, this.width, this.height);

    this.arcs.forEach((arc) => {
      arc.draw(this.context as CanvasRenderingContext2D);
    });
    this.context.lineWidth = this.params["line-width"] ?? 1;
    this.context.strokeStyle = `rgba(${
      this.params["color"].join(",") ?? "255,255,255,1"
    })`;
    this.rotatingArcs.forEach((arc, i) => {
      arc.draw(this.context as CanvasRenderingContext2D);
      arc.update(this.params["speed"] * ((i + 1) / 10000) * Math.PI);
    });

    const nGraduations = 12;
    const length = 110;
    this.context.save();
    this.context.lineWidth = 2;
    for (let i = 0; i < nGraduations; i++) {
      const angle = deg2rad((i * 360) / nGraduations);
      const x = Math.cos(angle) * 210 + this.width / 2;
      const y = Math.sin(angle) * 210 + this.height / 2;
      this.context.beginPath();
      this.context.moveTo(x, y);
      this.context.lineTo(
        Math.cos(angle) * (200 - length) + this.width / 2,
        Math.sin(angle) * (200 - length) + this.height / 2
      );
      this.context.stroke();
      this.context.closePath();
    }

    // Restore
    this.context.restore();
  }

  resize(): void {
    super.resize();
    this.arcs?.forEach((arc) => {
      arc.x = this.width / 2;
      arc.y = this.height / 2;
    });
    this.rotatingArcs?.forEach((arc) => {
      arc.x = this.width / 2;
      arc.y = this.height / 2;
    });
  }
}

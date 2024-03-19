export class Arc {
  constructor(public x: number, public y: number, public radius: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}

export class RotatingArc extends Arc {
  constructor(
    x: number,
    y: number,
    radius: number,
    public start: number,
    public end: number,
  ) {
    super(x, y, radius);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.start, this.end);
    ctx.stroke();
    ctx.closePath();
  }

  update(speed: number) {
    this.start += speed;
    this.end += speed;
  }
}

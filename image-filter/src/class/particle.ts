export default class Particle {
  private startAngle: number = 0;
  private endAngle: number = Math.PI * 2;
  private x: number;
  private y: number;
  private velocity: number = Math.random() * 1.5;
  private size: number = Math.random() * 1.8 + 1;
  public speed: number = 0;
  public posX: number;
  public posY: number;

  constructor(private maxWidth: number, private maxHeight: number) {
    this.x = Math.random() * this.maxWidth;
    this.posX = Math.floor(this.x);
    this.y = Math.random() * this.maxHeight;
    this.posY = Math.floor(this.y);
  }

  rain(speed: number): void {
    this.posX = Math.floor(this.x);
    this.posY = Math.floor(this.y);
    this.speed = speed;
    let movement = 2.4 - this.speed + this.velocity;
    this.y += movement;
    if (this.y >= this.maxHeight) {
      this.y = 0;
      this.x = Math.random() * this.maxWidth;
    }
  }

  draw(ctx: CanvasRenderingContext2D, color: string): void {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, this.size, this.startAngle, this.endAngle);
    ctx.fill();
  }
}

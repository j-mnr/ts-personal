import Particle from "./class/particle.js";
import ICell from "./interface/cell.js";

const img: HTMLImageElement = new Image();
img.src = "./image.jpg";

img.addEventListener("load", colorRain);

const calculateRelativeBrightness = (r: number, g: number, b: number): number =>
  Math.sqrt(r ** 2 * 0.299 + g ** 2 * 0.587 + b ** 2 * 0.114) / 100;
function colorRain(): void {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = 640;
  canvas.height = 871;

  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  const pixels: ImageData = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  );
  context.clearRect(0, 0, canvas.width, canvas.height);

  const particleArray: Particle[] = [];
  for (let i = 0; i < 2000; i++) {
    particleArray.push(new Particle(canvas.width, canvas.height));
  }

  const mappedImage: ICell[][] = [];
  for (let y = 0; y < canvas.height; y++) {
    const row: ICell[] = [];
    for (let x = 0; x < canvas.width; x++) {
      const red: number = pixels.data[y * 4 * pixels.width + x * 4]!;
      const green: number = pixels.data[y * 4 * pixels.width + (x * 4 + 1)]!;
      const blue: number = pixels.data[y * 4 * pixels.width + (x * 4 + 2)]!;
      const brightness = calculateRelativeBrightness(red, green, blue);
      const cell: ICell = {
        brightness: brightness,
        color: `rgb(${red}, ${green}, ${blue})`,
      };
      row.push(cell);
    }
    mappedImage.push(row);
  }

  function animate() {
    context.globalAlpha = 0.05;
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 0.2;
    particleArray.forEach((p: Particle) => {
      p.rain(mappedImage[p.posY]![p.posX]!.brightness);
      context.globalAlpha = p.speed * 0.5;
      p.draw(context, mappedImage[p.posY]![p.posX]!.color);
    });
    window.requestAnimationFrame(animate);
  }
  window.requestAnimationFrame(animate);
}

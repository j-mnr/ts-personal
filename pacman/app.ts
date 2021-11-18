import layout from "./layout";

const scoreDisplay = document.getElementById("score") as HTMLSpanElement;
const width = 28;
let score = 0;
const grid = document.querySelector("grid") as HTMLDivElement;

const squares: HTMLDivElement[] = [];
function createBoard() {
  layout.forEach((v) => {
    const square = document.createElement("div") as HTMLDivElement;
    grid.appendChild(square);
    if (v === 0) {
      square.classList.add("pac-dot");
    } else if (v === 1) {
      square.classList.add("wall");
    } else if (v === 2) {
      square.classList.add("ghost-lair");
    } else if (v === 3) {
      square.classList.add("power-pellet");
    }
    squares.push(square);
  });
}
createBoard();

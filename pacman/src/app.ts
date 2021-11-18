import layout from "./layout";

const scoreDisplay = document.getElementById("score") as HTMLSpanElement;
const width = 28;
let score = 0;
const grid = document.querySelector(".grid") as HTMLDivElement;

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

let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex].classList.add("pac-man");

function isOpenSpace(idx: number): boolean {
  return (
    !squares[idx].classList.contains("wall") &&
    !squares[idx].classList.contains("ghost-lair")
  );
}

function movePacman(e: KeyboardEvent) {
  squares[pacmanCurrentIndex].classList.remove("pac-man");
  if (e.key === "a") {
    if (pacmanCurrentIndex % width !== 0 && isOpenSpace(pacmanCurrentIndex - 1))
      pacmanCurrentIndex -= 1;
    if (squares[pacmanCurrentIndex - 1] === squares[363])
      pacmanCurrentIndex = 391;
  } else if (e.key === "w") {
    if (
      pacmanCurrentIndex - width >= 0 &&
      isOpenSpace(pacmanCurrentIndex - width)
    )
      pacmanCurrentIndex -= width;
  } else if (e.key === "d") {
    if (
      pacmanCurrentIndex % width < width - 1 &&
      isOpenSpace(pacmanCurrentIndex + 1)
    )
      pacmanCurrentIndex += 1;
    if (squares[pacmanCurrentIndex + 1] === squares[392])
      pacmanCurrentIndex = 364;
  } else if (e.key === "s") {
    if (
      pacmanCurrentIndex + width < width * width &&
      isOpenSpace(pacmanCurrentIndex + width)
    )
      pacmanCurrentIndex += width;
  }
  squares[pacmanCurrentIndex].classList.add("pac-man");
  // TODO: pacDotEaten()
  // TODO: powerPelletEaten()
  // TODO: checkForGameOver()
  // TODO: checkForWin()
}
document.addEventListener("keydown", movePacman);

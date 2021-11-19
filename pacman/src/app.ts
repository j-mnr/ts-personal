import ClassNames from "./classNames.js";
import Ghost from "./ghost.js";
import layout from "./layout.js";

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
      square.classList.add(ClassNames.Dot);
    } else if (v === 1) {
      square.classList.add(ClassNames.Wall);
    } else if (v === 2) {
      square.classList.add(ClassNames.Lair);
    } else if (v === 3) {
      square.classList.add(ClassNames.Pellet);
    }
    squares.push(square);
  });
}
createBoard();

let pacmanCurrentIndex = 490;
squares[pacmanCurrentIndex]?.classList.add(ClassNames.Pacman);

function isOpenSpace(idx: number): boolean {
  return (
    !squares[idx]?.classList.contains(ClassNames.Wall) &&
    !squares[idx]?.classList.contains(ClassNames.Lair)
  );
}

function movePacman(e: KeyboardEvent) {
  squares[pacmanCurrentIndex]?.classList.remove(ClassNames.Pacman);
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
  squares[pacmanCurrentIndex]?.classList.add(ClassNames.Pacman);
  pacDotEaten();
  powerPelletEaten();
  // TODO: checkForGameOver()
  // TODO: checkForWin()
}

function pacDotEaten() {
  if (!squares[pacmanCurrentIndex]?.classList.contains(ClassNames.Dot)) return;

  score += 1;
  scoreDisplay.innerHTML = `${score}`;
  squares[pacmanCurrentIndex]?.classList.remove(ClassNames.Dot);
}

function powerPelletEaten() {
  if (!squares[pacmanCurrentIndex]?.classList.contains(ClassNames.Pellet))
    return;

  score += 10;
  ghosts.forEach((g) => g.toggleScared());
  setTimeout(() => ghosts.forEach((g) => g.toggleScared()), 10000);
  ghosts[0]!.timerId = setInterval("wat");
  squares[pacmanCurrentIndex]?.classList.remove(ClassNames.Pellet);
}

const ghosts = [
  new Ghost("blinky", 348, 250),
  new Ghost("pinky", 376, 400),
  new Ghost("inky", 351, 300),
  new Ghost("clyde", 379, 500),
];

// TODO: scare ghosts
// TODO: move ghosts
ghosts.forEach((g) => {
  squares[g.currIdx]?.classList.add(g.className);
  squares[g.currIdx]?.classList.add(ClassNames.Ghost);
});

document.addEventListener("keydown", movePacman);

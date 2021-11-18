"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const layout_1 = __importDefault(require("./layout"));
const scoreDisplay = document.getElementById("score");
const width = 28;
let score = 0;
const grid = document.querySelector("grid");
const squares = [];
function createBoard() {
    layout_1.default.forEach((v) => {
        const square = document.createElement("div");
        grid.appendChild(square);
        if (v === 0) {
            square.classList.add("pac-dot");
        }
        else if (v === 1) {
            square.classList.add("wall");
        }
        else if (v === 2) {
            square.classList.add("ghost-lair");
        }
        else if (v === 3) {
            square.classList.add("power-pellet");
        }
        squares.push(square);
    });
}
createBoard();

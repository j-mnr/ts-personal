let userName: string = "Jay";
let hasLoggedIn: boolean = true;

userName += " Fix bugs";

console.log(hasLoggedIn);

let num: number = 10;

let re: RegExp = /baz/;

const names: string[] = userName.split(" ");
const nums: Array<number> = [1, 2, 3];

interface Person {
  first: string;
  second: string;
}

const person: Person = {
  first: "Realest",
  second: "Best",
};

const ids: Record<number, string> = {
  10: "a",
  20: "p",
};
ids[30] = "c";

if (ids[30] == "D") {
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}

[1, 2, 3].forEach((v) => console.log(v));
const out = [4, 5, 6].map(v => `${v * 10}`)

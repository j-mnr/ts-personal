interface Coordinate {
  x: number;
  y: number;
}

function parseCoordinate(obj: Coordinate): Coordinate;
function parseCoordinate(x: number, y: number): Coordinate;
function parseCoordinate(s: string): Coordinate;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordinate {
  if (typeof arg1 === "object") {
    return { ...(arg1 as Coordinate) };
  } else if (typeof arg1 === "string") {
    const coord: Coordinate = { x: 0, y: 0 };
    (arg1 as string).split(",").forEach((kvp) => {
      const [key, val] = kvp.split(":");
      coord[key as "x" | "y"] = Number.parseInt(val);
    });
    return coord;
  }
  return { x: arg1, y: arg2 } as Coordinate;
}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 30, y: 40 }));
console.log(parseCoordinate("x:12,y:22"));

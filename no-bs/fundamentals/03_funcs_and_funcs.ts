export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

export type MutationFunction = (v: number) => number;

export const arrayMutate = (
  nums: number[],
  mutate: MutationFunction
): number[] => nums.map(mutate);

const myNewMutateFunc: MutationFunction = (v: number) => v * 100;

export type AdderFunction = (v: number) => number;
export function createAdder(n: number): AdderFunction {
  return (v: number) => n + v;
}

const addOne = createAdder(1);

console.log(arrayMutate([1, 2, 3], (v) => v * 10));

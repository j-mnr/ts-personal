function addNumbers(a: number, b: number): number {
  return a + b;
}

export const addStrings = (s1: string, s2: string): string => `${s1} ${s2}`;

export const format = (title: string, param: string | number): string =>
  `${title} ${param}`;

export const printFormat = (title: string, param: string | number): void =>
  console.log(`${title} ${param}`);

export const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`Data from ${url}`);

export function introduce(greeting: string, ...names: string[]): string {
  return `${greeting} ${names.join(" ")}`;
}

// XXX: TypeScript only works at compile time NOT at runtime.
export function getName(user: { first: string; last: string }): string {
  return `${user?.first ?? "First"} ${user?.last ?? "Last"}`;
}

export default addNumbers;

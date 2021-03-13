type Test = (a: number, b: number) => number;
type Test2 = (a: number, b: number) => number;
type Test3 = (a: number, b: number) => number;

export const test: Test = (a, b) => a + b;
export const test2: Test2 = (a, b) => a * b;
export const test3: Test3 = (a, b) => a / b;
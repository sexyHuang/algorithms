// 命名元祖
const turpleNamed = (): [start: number, middle: number, end: number] => {
  return [1, 2, 3];
};

const [start, middle, end] = turpleNamed();

type Strings = [string, string];
type Numbers = [number, number];

type StrStrNumNumBool = [...Strings, ...Numbers, boolean];

function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr;
  return rest;
}

const myTuple = [1, 2, 3, 4] as const;
const myArray = ['hello', 'world'];

// type [2, 3, 4]
const r1 = tail(myTuple);

// type [2, 3, ...string[]]
const r2 = tail([...myTuple, ...myArray] as const);

export default {};

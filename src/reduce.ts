function reduce<T>(
  [prev, ...arr]: T[],
  reducer: (prev: T, curr: T, currIdx: number) => T,
  initialValue?: T
) {
  if (initialValue) {
    arr = [prev, ...arr];
    prev = initialValue;
  }
  for (let [currIdx, curr] of arr.entries()) {
    prev = reducer(prev, curr, currIdx);
  }
  return prev;
}

const arr = [0, 1, 2, 3, 4, 5];

console.log(reduce(arr, (prev, curr) => prev + curr, 10));

export {};

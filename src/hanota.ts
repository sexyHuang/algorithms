/**
 Do not return anything, modify C in-place instead.
 */

type Item = { arr: number[]; name: string };

function step(from: Item, to: Item) {
  to.arr.push(from.arr.pop()!);
  console.log(`${from.name} -> ${to.name}`);
}

function hanota(A: Item, B: Item, C: Item): void {
  const move = (A: Item, B: Item, C: Item, n: number) => {
    if (n === 1) {
      step(A, C);
    } else {
      move(A, C, B, n - 1);
      step(A, C);
      move(B, A, C, n - 1);
    }
  };
  move(A, B, C, A.arr.length);
}

hanota(
  {
    name: 'A',
    arr: [4, 3, 2, 1, 0]
  },
  {
    name: 'B',
    arr: []
  },
  {
    name: 'C',
    arr: []
  }
);

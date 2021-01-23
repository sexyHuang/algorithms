const STEP_ARR = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function getMaximumGold(grid: number[][]): number {
  const recursion = (i: number, j: number): number => {
    if (!grid[i]?.[j]) return 0;
    const value = grid[i][j];
    grid[i][j] = 0;
    const res =
      value +
      Math.max(...STEP_ARR.map(([di, dj]) => recursion(i + di, j + dj)));
    grid[i][j] = value;
    return res;
  };
  return grid.reduce(
    (prev, column, i) =>
      column.reduce((prev, _, j) => Math.max(prev, recursion(i, j)), prev),
    0
  );
}
const grid = [
  [1, 0, 7],
  [2, 0, 6],
  [3, 4, 5],
  [0, 3, 0],
  [9, 0, 20],
];

console.log(getMaximumGold(grid));

export default {};

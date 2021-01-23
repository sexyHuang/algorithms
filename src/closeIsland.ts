function closedIsland(grid: number[][]): number {
  const dfs = (i: number, j: number): boolean => {
    if (grid[i][j] === 1) return true;
    if (i === grid.length - 1 || j === grid[0].length - 1 || !i || !j)
      return false;
    grid[i][j] = 1;
    const dMap = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1],
    ];
    return dMap.reduce(
      (prev: boolean, [di, dj]) => dfs(i + di, j + dj) && prev,
      true
    );
  };
  let res = 0;
  grid.forEach((column, i) => {
    column.forEach((value, j) => {
      if (!value && dfs(i, j)) {
        console.log(i, j);
        res++;
      }
    });
  });
  return res;
}

const grid = [
  [0, 0, 1, 1, 0, 1, 0, 0, 1, 0],
  [1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
  [1, 0, 1, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
];

console.log(closedIsland(grid));

export default {};

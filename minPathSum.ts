function minPathSum(grid: number[][]): number {
  const dp = Array.from({ length: grid[0].length + 1 }, () => Infinity);

  grid.forEach((row, rowIdx) =>
    row.forEach((value, columnIdx) => {
      if (!rowIdx && !columnIdx) dp[columnIdx + 1] = value;
      else
        dp[columnIdx + 1] = Math.min(dp[columnIdx], dp[columnIdx + 1]) + value;
    })
  );
  return dp.pop()!;
}
const grid = [
  [1, 2, 5],
  [3, 2, 1],
];

console.log(minPathSum(grid));

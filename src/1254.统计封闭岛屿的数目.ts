/*
 * @lc app=leetcode.cn id=1254 lang=typescript
 *
 * [1254] 统计封闭岛屿的数目
 */

// @lc code=start
function closedIsland(grid: number[][]): number {
  const dArr = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  const dfs = (i: number, j: number): boolean => {
    if (grid[i]?.[j] === undefined) return false;
    if (grid[i][j] === 1) return true;

    grid[i][j] = 1;
    let isClosedIsland = true;
    for (let [di, dj] of dArr) {
      isClosedIsland = dfs(i + di, j + dj) && isClosedIsland;
    }
    return isClosedIsland;
  };
  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) continue;

      if (dfs(i, j)) res += 1;
    }
  }
  return res;
}
// @lc code=end
closedIsland([
  [0, 0, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 1, 0]
]);

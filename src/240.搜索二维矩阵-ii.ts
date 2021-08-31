/*
 * @lc app=leetcode.cn id=240 lang=typescript
 *
 * [240] 搜索二维矩阵 II
 */

// @lc code=start
function searchMatrix(matrix: number[][], target: number): boolean {
  const [maxRow, maxColumn] = [matrix.length - 1, matrix[0].length - 1];
  let [i, j] = [0, maxColumn];
  const legalIndex = (i: number, j: number) =>
    i >= 0 && i <= maxRow && j >= 0 && j <= maxColumn;

  while (legalIndex(i, j)) {
    const tag = matrix[i][j];
    if (tag === target) return true;
    if (tag > target) j -= 1;
    else i += 1;
  }
  return false;
}
// @lc code=end

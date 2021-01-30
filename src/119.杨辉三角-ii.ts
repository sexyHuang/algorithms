/*
 * @lc app=leetcode.cn id=119 lang=typescript
 *
 * [119] 杨辉三角 II
 */

// @lc code=start
function getRow(rowIndex: number): number[] {
  const row = [1];
  for (let i = 1; i <= rowIndex; i++) {
    const length = row.length;
    for (let j = length; j >= 0; j--) {
      row[j] = (row[j] ?? 0) + (row[j - 1] ?? 0);
    }
  }
  return row;
}
// @lc code=end

console.log(getRow(3));

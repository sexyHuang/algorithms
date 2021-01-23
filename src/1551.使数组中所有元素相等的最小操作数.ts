/*
 * @lc app=leetcode.cn id=1551 lang=typescript
 *
 * [1551] 使数组中所有元素相等的最小操作数
 */

// @lc code=start
function minOperations(n: number): number {
  return Math.floor(n ** 2 / 4);
}
// @lc code=end

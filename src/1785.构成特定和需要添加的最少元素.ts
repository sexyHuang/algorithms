/*
 * @lc app=leetcode.cn id=1785 lang=typescript
 *
 * [1785] 构成特定和需要添加的最少元素
 */

// @lc code=start
function minElements(nums: number[], limit: number, goal: number): number {
  const sum = nums.reduce((prev, curr) => prev + curr);
  const d = Math.abs(goal - sum);
  let count = 0;
  while (limit > 0) {
    count += 1;
    limit -= d;
  }
  return count;
}
// @lc code=end

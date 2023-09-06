/*
 * @lc app=leetcode.cn id=169 lang=typescript
 *
 * [169] 多数元素
 */

// @lc code=start
function majorityElement(nums: number[]): number {
  let target: number;
  let count = 0;
  for (const num of nums) {
    if (count === 0) {
      target = num;
    }
    count += target! === num ? 1 : -1;
  }
  return target!;
}
// @lc code=end

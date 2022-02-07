/*
 * @lc app=leetcode.cn id=896 lang=typescript
 *
 * [896] 单调数列
 */

// @lc code=start
function isMonotonic(nums: number[]): boolean {
  if (nums.length <= 1) return true;
  let beforeDiff = 0;
  for (let i = 1; i < nums.length; i++) {
    const diff = nums[i] - nums[i - 1];
    if (diff === 0) {
      continue;
    }
    if (diff * beforeDiff < 0) return false;
    beforeDiff = diff;
  }
  return true;
}
// @lc code=end

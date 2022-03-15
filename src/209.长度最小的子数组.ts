/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 */

// @lc code=start
function minSubArrayLen(target: number, nums: number[]): number {
  let [left, right] = [-1, -1];
  const arrLength = nums.length;
  let sum = 0;
  let minLength = Infinity;
  while (left < arrLength && right < arrLength) {
    if (sum < target) {
      sum += nums[++right];
    } else {
      minLength = Math.min(minLength, right - left);
      sum -= nums[++left];
    }
  }
  return minLength === Infinity ? 0 : minLength;
}
// @lc code=end

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));

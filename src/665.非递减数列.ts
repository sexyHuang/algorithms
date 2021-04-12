/*
 * @lc app=leetcode.cn id=665 lang=typescript
 *
 * [665] 非递减数列
 */

// @lc code=start
function checkPossibility(nums: number[]): boolean {
  const end = nums.length - 1;
  let [left, right] = [0, end];
  while (left < end && nums[left + 1] >= nums[left]) left += 1;
  if (left === end) return true;
  while (right > 0 && nums[right - 1] <= nums[right]) right -= 1;
  if (right - left > 1) return false;
  if (left === 0 || right === end) return true;
  if (nums[left - 1] <= nums[right] || nums[right + 1] >= nums[left])
    return true;
  return false;
}
// @lc code=end

checkPossibility([4, 2, 3]);

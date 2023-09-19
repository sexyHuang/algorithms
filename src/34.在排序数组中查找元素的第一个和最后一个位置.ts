/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 */

// @lc code=start
function searchRange(nums: number[], target: number): number[] {
  const res = [-1, -1];
  function binarySearch(left = 0, right = nums.length) {
    const middleIdx = (left + right) >> 1;
    const _m = nums[middleIdx];
    if (nums[middleIdx] === target) {
      res[0] = res[0] >= 0 ? Math.min(res[0], middleIdx) : middleIdx;
      res[1] = Math.max(res[1], middleIdx);
    }
    if (left < right) {
      if (_m >= target) binarySearch(left, middleIdx - 1);
      if (_m <= target) binarySearch(middleIdx + 1, right);
    }
  }
  binarySearch();
  return res;
}
// @lc code=end

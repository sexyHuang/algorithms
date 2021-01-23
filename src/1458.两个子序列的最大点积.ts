/*
 * @lc app=leetcode.cn id=1458 lang=typescript
 *
 * [1458] 两个子序列的最大点积
 */

// @lc code=start
function maxDotProduct(nums1: number[], nums2: number[]): number {
  const dp: number[] = Array.from(
    {
      length: nums2.length + 1
    },
    () => -Infinity
  );

  for (let i = 0; i < nums1.length; i++) {
    let before = dp[0];
    for (let j = 1; j < nums2.length + 1; j++) {
      const temp = dp[j];
      dp[j] = Math.max(
        dp[j - 1],
        dp[j],
        (before > 0 ? before : 0) + nums1[i] * nums2[j - 1]
      );
      before = temp;
    }
  }

  return dp.pop()!;
}
// @lc code=end

const nums1 = [9, 2, 3, 7, -9, 1, -8, 5, -1, -1],
  nums2 = [-3, -8, 3, -10, 1, 3, 9];
console.log(maxDotProduct(nums1, nums2));

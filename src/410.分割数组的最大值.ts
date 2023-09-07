/*
 * @lc app=leetcode.cn id=410 lang=typescript
 *
 * [410] 分割数组的最大值
 * 转移方程
 * i: 前i个数，j: 分割j次
 * dp[i][j] = Min{k in 0 ~ i-1}(max(dp[k][j -1], sum(k+1, i)))
 */

// @lc code=start

function sum(nums: number[], start: number, end: number) {
  let res = 0;
  for (let i = start; i < end; i++) {
    res += nums[i];
  }
  return res;
}

function splitArray(nums: number[], k: number): number {
  const dp = nums.reduce(
    (prev, curr) => {
      prev.push(prev[prev.length - 1] + curr);
      return prev;
    },
    [0]
  );

  for (let i = nums.length; i > 0; i--) {
    for (let j = 0; j < k; j++) {
      let min = Infinity;
      for (let m = 0; m <= i; m++) {
        if (m <= j) {
          continue;
        }
        min = Math.min(min, Math.max(dp[m], sum(nums, m + 1, i)));
      }
      dp[i] = min;
    }
  }
}
// @lc code=end

export {};

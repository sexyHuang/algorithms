/*
 * @lc app=leetcode.cn id=799 lang=typescript
 *
 * [799] 香槟塔
 */

// @lc code=start
function champagneTower(
  poured: number,
  query_row: number,
  query_glass: number
): number {
  const dp = [poured];
  for (let i = 0; i < query_row; i++) {
    for (let j = dp.length; j >= 0; j--) {
      let in1 = (dp[j] ?? 0) > 1 ? dp[j] - 1 : 0;
      let in2 = (dp[j - 1] ?? 0) > 1 ? dp[j - 1] - 1 : 0;

      dp[j] = (in1 + in2) / 2;
    }
  }
  return dp[query_glass] >= 1 ? 1 : 0;
}
// @lc code=end
console.log(champagneTower(100000009, 33, 17));

/*
 * @lc app=leetcode.cn id=629 lang=typescript
 *
 * [629] K个逆序对数组
 */

// @lc code=start
const MOD_BASE = 1e9 + 7;

const transFun = (dp: number[], dpOld: number[], j: number, i: number) => {
  const val = (dpOld[j] + MOD_BASE - (dpOld[j - i] ?? 0)) % MOD_BASE;
  return ((dp[j - 1] ?? 0) + val) % MOD_BASE;
};
function kInversePairs(n: number, k: number): number {
  const dp: number[] = Array.from(
    {
      length: k + 1
    },
    (_, i) => (i === 0 ? 1 : 0)
  );
  for (let i = 2; i <= n; i++) {
    const dpOld = [...dp];
    for (let j = 0; j < k + 1; j++) {
      dp[j] = transFun(dp, dpOld, j, i);
    }
  }
  return dp.pop()!;
}
// @lc code=end
console.log(kInversePairs(1000, 1000));

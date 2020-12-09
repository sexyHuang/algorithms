/*
 * @lc app=leetcode.cn id=967 lang=typescript
 *
 * [967] 连续差相同的数字
 */

// @lc code=start
function numsSameConsecDiff(n: number, k: number): number[] {
  const dp: number[][][] = Array.from(
    {
      length: n
    },
    (_, idx) =>
      Array.from(
        {
          length: 10
        },
        (_, i) => (idx === 0 ? [i] : [])
      )
  );
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < 10; j++) {
      //  if (i === 1 && j - k === 0) continue;

      const lf = i !== 1 || j - k !== 0 ? dp[i - 1][j - k] ?? [] : [];
      const lr = k !== 0 ? dp[i - 1][j + k] ?? [] : [];
      dp[i][j] = [...lf, ...lr].map(val => Number(`${val}${j}`));
    }
  }
  return dp.pop()!.reduce((prev, curr) => [...prev, ...curr], [] as number[]);
}
// @lc code=end

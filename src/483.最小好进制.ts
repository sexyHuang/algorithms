/*
 * @lc app=leetcode.cn id=483 lang=typescript
 *
 * [483] 最小好进制
 *
 */
// @lc code=start

const sum = (a: number, n: number) => {
  return (BigInt(a) ** BigInt(n) - 1n) / BigInt(a - 1);
};
function smallestGoodBase(n: string): string {
  // (11...11)k = k^{s} + k^{s-1} + ... + k^1 + k^0 = n
  // k^s < n < (k+1)^s
  // k < n^{1/s} < k+1
  // n < 10^18
  // s <= 59
  const _n = Number(n);
  let res = `${BigInt(n) - 1n}`;
  for (let s = 59; s > 1; s--) {
    const k = Math.floor(_n ** (1 / s));
    if (k < 2) continue;
    const _sum = sum(k, s + 1);

    if (_sum === BigInt(n)) {
      res = `${k}`;
      break;
    }
  }

  return res;
}
// @lc code=end
const n = '16035713712910627';

console.log(smallestGoodBase(n));

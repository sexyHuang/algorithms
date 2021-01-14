/*
 * @lc app=leetcode.cn id=413 lang=typescript
 *
 * [413] 等差数列划分
 */

// @lc code=start
function numberOfArithmeticSlices(A: number[]): number {
  const counter = (length: number) => {
    return length > 1 ? ((length - 1) * length) / 2 : 0;
  };
  let d = Infinity;
  let before = Infinity;
  let count = 0;
  let res = 0;
  for (let s of A) {
    const _d = s - before;
    if (_d === d) {
      count += 1;
    } else {
      res += counter(count);
      d = _d;
      count = 1;
    }
    before = s;
  }
  return res + counter(count);
}
// @lc code=end

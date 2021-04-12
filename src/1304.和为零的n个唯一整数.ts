/*
 * @lc app=leetcode.cn id=1304 lang=typescript
 *
 * [1304] 和为零的N个唯一整数
 */

// @lc code=start
function sumZero(n: number): number[] {
  let i = Math.floor(n / 2);
  const res = n % 2 ? [0] : [];
  while (i > 0) {
    res.push(i, -1 * i);
    i -= 1;
  }
  return res;
}
// @lc code=end

console.log(sumZero(4));

/*
 * @lc app=leetcode.cn id=264 lang=typescript
 *
 * [264] 丑数 II
 */

// @lc code=start
function nthUglyNumber(n: number): number {
  const uglyList = [1];
  let [f2, f3, f5] = [2, 3, 5];
  let [i2, i3, i5] = [0, 0, 0];
  let min = 1;
  for (let i = 1; i < n; i++) {
    min = Math.min(f2, f3, f5);
    uglyList.push(min);
    if (min === f2) f2 = 2 * uglyList[++i2];
    if (min === f3) f3 = 3 * uglyList[++i3];
    if (min === f5) f5 = 5 * uglyList[++i5];
  }
  return uglyList[n - 1];
}
// @lc code=end
debugger;
console.log(nthUglyNumber(10));

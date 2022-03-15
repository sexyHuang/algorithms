/*
 * @lc app=leetcode.cn id=754 lang=typescript
 *
 * [754] 到达终点数字
 */

// @lc code=start
function reachNumber(target: number): number {
  let i = 0;
  let sum = 0;
  target = Math.abs(target);
  while (sum < target) {
    sum += ++i;
  }
  const d = sum - target;
  return d % 2 ? i + (i % 2 ? 2 : 1) : i;
}
// @lc code=end

console.log(reachNumber(2));

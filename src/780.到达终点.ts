/*
 * @lc app=leetcode.cn id=780 lang=typescript
 *
 * [780] 到达终点
 */

// @lc code=start
function reachingPoints(
  sx: number,
  sy: number,
  tx: number,
  ty: number
): boolean {
  while (tx >= sx && ty >= sy) {
    if (tx === ty) break;
    if (tx > ty) {
      if (ty > sy) tx %= ty;
      else return (tx - sx) % ty === 0;
    } else if (tx > sx) ty %= tx;
    else return (ty - sy) % tx === 0;
  }
  return tx === sx && ty === sy;
}
// @lc code=end
console.log(reachingPoints(35, 13, 455955547, 420098884));

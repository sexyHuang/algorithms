/*
 * @lc app=leetcode.cn id=1482 lang=typescript
 *
 * [1482] 制作 m 束花所需的最少天数
 */

// @lc code=start
function minDays(bloomDay: number[], m: number, k: number): number {
  let minDay = Math.min(...bloomDay);
  let maxDay = Math.max(...bloomDay);
  let res = -1;
  const calBouquets = (targetDay: number) => {
    let count = 0;
    let bouquets = 0;
    for (let bd of bloomDay) {
      if (bd > targetDay) {
        count = 0;
        continue;
      }
      count += 1;
      if (count === k) {
        count = 0;
        bouquets += 1;
      }
    }
    return bouquets;
  };
  while (minDay <= maxDay) {
    const targetDay = Math.floor((minDay + maxDay) / 2);
    if (m <= calBouquets(targetDay)) {
      res = targetDay;
      maxDay = targetDay - 1;
    } else {
      minDay = targetDay + 1;
    }
  }
  return res;
}
// @lc code=end
const bloomDay = [7, 7, 7, 7, 12, 7, 7];
const m = 2;
const k = 3;
console.log(minDays(bloomDay, m, k));

export default {};

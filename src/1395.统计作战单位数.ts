/*
 * @lc app=leetcode.cn id=1395 lang=typescript
 *
 * [1395] 统计作战单位数
 */

// @lc code=start
function numTeams(rating: number[]): number {
  const length = rating.length;
  const sum = (idx: number) => {
    let [biggerBefore, biggerAfter, smallerBefore, smallerAfter] = [0, 0, 0, 0];
    const target = rating[idx];
    for (let i = 0; i < idx; i++) {
      const before = rating[i];
      if (target > before) {
        smallerBefore += 1;
      } else if (target < before) {
        biggerBefore += 1;
      }
    }
    for (let i = idx + 1; i < length; i++) {
      const after = rating[i];
      if (target > after) {
        smallerAfter += 1;
      } else if (target < after) {
        biggerAfter += 1;
      }
    }
    return biggerBefore * smallerAfter + smallerBefore * biggerAfter;
  };
  return rating.reduce((prev, curr, currIdx) => prev + sum(currIdx), 0);
}
// @lc code=end

/*
 * @lc app=leetcode.cn id=1630 lang=typescript
 *
 * [1630] 等差子数组
 */

// @lc code=start
function checkArithmeticSubarrays(
  nums: number[],
  l: number[],
  r: number[]
): boolean[] {
  return l.map((left, i) => {
    const query = nums.slice(left, r[i] + 1).sort((a, b) => a - b);
    const base = query[1] - query[0];
    let j = 0;
    while (j < query.length - 1) {
      if (query[j + 1] - query[j] !== base) return false;
      j++;
    }
    return true;
  });
}
// @lc code=end

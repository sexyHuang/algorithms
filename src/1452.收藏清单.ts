/*
 * @lc app=leetcode.cn id=1452 lang=typescript
 *
 * [1452] 收藏清单
 */

// @lc code=start
function peopleIndexes(favoriteCompanies: string[][]): number[] {
  const setArr = favoriteCompanies.map(list => new Set(list));
  return favoriteCompanies.reduce(
    (prev, curr, currIdx) =>
      setArr.some(
        set => set.size > curr.length && curr.every(item => set.has(item))
      )
        ? prev
        : [...prev, currIdx],
    [] as number[]
  );
}
// @lc code=end

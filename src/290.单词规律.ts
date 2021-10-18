/*
 * @lc app=leetcode.cn id=290 lang=typescript
 *
 * [290] 单词规律
 */

// @lc code=start
function wordPattern(pattern: string, s: string): boolean {
  const p2sMap = new Map<string, string>();
  const visitedSet = new Set<string>();
  const letters = s.split(' ');
  if (letters.length !== pattern.length) return false;
  for (let [i, letter] of letters.entries()) {
    if (!p2sMap.has(pattern[i])) {
      if (visitedSet.has(letter)) return false;
      p2sMap.set(pattern[i], letter);
      visitedSet.add(letter);
    } else if (p2sMap.get(pattern[i]) !== letter) return false;
  }
  return true;
}
// @lc code=end

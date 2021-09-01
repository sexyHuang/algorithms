/*
 * @lc app=leetcode.cn id=942 lang=typescript
 *
 * [942] 增减字符串匹配
 */

// @lc code=start
function diStringMatch(s: string): number[] {
  let [min, max] = [0, s.length];
  return [...[...s].map(letter => (letter === 'I' ? min++ : max--)), max];
}
// @lc code=end

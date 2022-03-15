/*
 * @lc app=leetcode.cn id=438 lang=typescript
 *
 * [438] 找到字符串中所有字母异位词
 */

// @lc code=start
const getIdx = (s: string, idx = 0) => {
  return s.charCodeAt(idx) - 'a'.charCodeAt(0);
};
function findAnagrams(s: string, p: string): number[] {
  const counts = Array.from({ length: 26 }, () => 0);

  const [pLen, sLen] = [p.length, s.length];
  const res: number[] = [];
  if (pLen > sLen) return res;
  for (let i = 0; i < pLen; i++) {
    counts[getIdx(p, i)] += 1;
  }
  let [left, right] = [0, 0];
  while (right < sLen) {
    if (counts[getIdx(s, right)] > 0) {
      counts[getIdx(s, right++)] -= 1;
      if (right - left === pLen) {
        res.push(left);
      }
    } else {
      counts[getIdx(s, left++)] += 1;
    }
  }
  return res;
}
// @lc code=end
console.log(findAnagrams('acdcaeccde', 'c'));

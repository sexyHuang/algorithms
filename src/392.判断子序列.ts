/*
 * @lc app=leetcode.cn id=392 lang=typescript
 *
 * [392] 判断子序列
 */

// @lc code=start
function isSubsequence(s: string, t: string): boolean {
  const idxMatrix = Array.from({ length: t.length + 1 }, () => {
    return Array.from({ length: 26 }, () => -1);
  });
  const idxVector = Array.from({ length: 26 }, () => -1);
  const charCode_a = 'a'.charCodeAt(0);
  for (let i = t.length; i >= 0; i--) {
    idxMatrix[i] = idxVector.slice();
    const idx = t.charCodeAt(i - 1) - charCode_a;
    idxVector[idx] = i;
  }
  let i = 0;
  for (let letter of s) {
    const idx = letter.charCodeAt(0) - charCode_a;
    if (idxMatrix[i][idx] < 0) return false;
    i = idxMatrix[i][idx];
  }
  return true;
}
// @lc code=end

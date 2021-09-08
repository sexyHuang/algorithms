/*
 * @lc app=leetcode.cn id=1832 lang=typescript
 *
 * [1832] 判断句子是否为全字母句
 */

// @lc code=start
function checkIfPangram(sentence: string): boolean {
  const arr = Array.from({ length: 26 }, () => 0);
  const chatCodeA = 'a'.charCodeAt(0);
  let dCount = 26;
  for (let letter of sentence) {
    const idx = letter.charCodeAt(0) - chatCodeA;
    if (arr[idx]) continue;
    arr[idx] = 1;
    dCount -= 1;
  }
  return dCount === 0;
}
// @lc code=end

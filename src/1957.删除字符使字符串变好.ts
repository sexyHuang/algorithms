/*
 * @lc app=leetcode.cn id=1957 lang=typescript
 *
 * [1957] 删除字符使字符串变好
 */

// @lc code=start
function makeFancyString(s: string): string {
  let res = '';
  for (let letter of s) {
    let [end, second_end] = [res.slice(-1), res.slice(-2, -1)];
    if (end !== second_end || end !== letter) {
      res += letter;
    }
  }
  return res;
}
// @lc code=end

/*
 * @lc app=leetcode.cn id=856 lang=typescript
 *
 * [856] 括号的分数
 */

// @lc code=start
function scoreOfParentheses(S: string): number {
  let count = 0;
  let flag = false;
  let res = 0;
  for (let s of S) {
    if (s === '(') {
      flag = true;
      count += 1;
    } else {
      count -= 1;
      if (flag) res += 2 ** count;
      flag = false;
    }
  }
  return res;
}
// @lc code=end

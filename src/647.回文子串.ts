/*
 * @lc app=leetcode.cn id=647 lang=typescript
 *
 * [647] 回文子串
 */

// @lc code=start
function countSubstrings(s: string): number {
  const dp = Array.from(
    {
      length: s.length
    },
    () => true
  );
  let res = s.length;
  for (let i = 1; i < s.length; i++) {
    for (let j = 0; j < i; j++) {
      dp[j] = s[j] === s[i] && dp[j + 1];
      dp[j] && (res += 1);
    }
  }
  return res;
}
// @lc code=end

console.log(countSubstrings('aabcbaa'));

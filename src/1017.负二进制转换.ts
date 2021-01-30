/*
 * @lc app=leetcode.cn id=1017 lang=typescript
 *
 * [1017] 负二进制转换
 */

// @lc code=start

function baseNeg2(N: number): string {
  let n = N;
  let res = '';
  const d = -2;
  if (n === 0) return '0';
  while (n !== 1) {
    const mod = n % d;
    n = 0 | (n / d);
    if (mod < 0) {
      n += 1;
    }
    res += `${mod ** 2}`;
  }
  return '1' + res.split('').reverse().join('');
}
// @lc code=end
console.log(baseNeg2(3));

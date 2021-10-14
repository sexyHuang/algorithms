/*
 * @lc app=leetcode.cn id=233 lang=typescript
 *
 * [233] 数字 1 的个数
 */

// @lc code=start
function countDigitOne(n: number): number {
  let s = 0;
  const countHundreds = (n: number, level: number) => {
    if (n === 1) return s + 1 + 10 ** (level - 1) * level;
    return 10 ** level + n * level * 10 ** (level - 1);
  };
  let level = 0;
  let res = 0;

  while (n) {
    let _n = n % 10;
    res += countHundreds(_n, level);
    s += _n * 10 ** level;
    level += 1;

    n = Math.floor(n / 10);
  }
  return res;
}

// @lc code=end

console.log(countDigitOne(13));

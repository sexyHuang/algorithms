/*
 * @lc app=leetcode.cn id=204 lang=typescript
 *
 * [204] 计数质数
 */

// @lc code=start
function countPrimes(n: number): number {
  const isPrimes = Array.from(
    {
      length: n - 1
    },
    (_, idx) => (idx ? 1 : 0)
  );
  let count = 0;
  for (let i = 1; i < n - 1; i++) {
    const num = i + 1;
    if (isPrimes[num]) {
      count += 1;
      for (let _num = num * num; _num < n; _num += num) {
        isPrimes[_num] = 0;
      }
    }
  }
  return count;
}
// @lc code=end
console.log(countPrimes(10));
